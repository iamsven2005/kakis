"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"

type Option = {
  value: number
  display: string
  discription?: string
}

const PAGE_SIZE = 6

const AdvancedCombobox: React.FC = () => {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [paginationEnabled, setPaginationEnabled] = useState(true)
  const [rawData, setRawData] = useState<Option[]>([])
  const [allData, setAllData] = useState<Option[]>([]) // Store all data for initial load
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const prevSearchRef = useRef("")

  const fetchData = async (searchTerm = "") => {
    try {
      setLoading(true)
      setError("")

      const res = await fetch(`/api/test?search=${encodeURIComponent(searchTerm)}`)

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const contentType = res.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON")
      }

      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const results = Array.isArray(data) ? data : []

      if (searchTerm === "") {
        // If no search term, this is the initial load - store all data
        setAllData(results)
        setRawData(results)
      } else {
        setRawData(results)
      }
    } catch (err) {
      console.error("Failed to fetch:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch data")
      setRawData([])
    } finally {
      setLoading(false)
    }
  }

  // Load all data when combobox is first opened
  const handleComboboxClick = () => {
    if (!open && !hasInitiallyLoaded) {
      setHasInitiallyLoaded(true)
      fetchData("") // Fetch all data
    }
    setOpen(!open)
  }

  useEffect(() => {
    if (search.trim() !== "" && search !== prevSearchRef.current) {
      prevSearchRef.current = search
      fetchData(search)
    } else if (search.trim() === "" && hasInitiallyLoaded) {
      // When search is cleared, show all data
      setRawData(allData)
      setError("")
    }
  }, [search, allData, hasInitiallyLoaded])

  const filteredOptions = rawData

  const pagedOptions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredOptions.slice(start, start + PAGE_SIZE)
  }, [filteredOptions, page])

  const toggleSelection = (value: number) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [search])

  const handleSubmit = () => {
    alert(`Selected IDs: ${selected.join(", ")}`)
  }

  const optionsToRender = paginationEnabled ? pagedOptions : filteredOptions

  return (
    <div ref={containerRef} style={{ position: "relative", width: 320, margin: "40px auto" }}>
      <div
        onClick={handleComboboxClick}
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          cursor: "pointer",
          background: "#fff",
          borderRadius: "4px",
        }}
      >
        {selected.length > 0
          ? allData
              .filter((item) => selected.includes(item.value))
              .map((item) => item.display)
              .join(", ")
          : "Select options..."}
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            zIndex: 10,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: 8,
            width: "100%",
            maxHeight: 250,
            overflowY: "auto",
            overflowX: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              marginBottom: 8,
              padding: 5,
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />

          {loading ? (
            <div style={{ textAlign: "center", padding: 20 }}>Loading...</div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: 20, color: "red" }}>Error: {error}</div>
          ) : optionsToRender.length > 0 ? (
            optionsToRender.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: "block",
                  marginBottom: 4,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt.value)}
                  onChange={() => toggleSelection(opt.value)}
                />
                <span style={{ marginLeft: 6 }}>
                  <strong>{opt.display}</strong>
                  {opt.discription && (
                    <span style={{ fontSize: 12, color: "#777", marginLeft: 6 }}>({opt.discription})</span>
                  )}
                </span>
              </label>
            ))
          ) : search.trim() !== "" ? (
            <div style={{ textAlign: "center", padding: 20, color: "#666" }}>No results found for "{search}"</div>
          ) : !hasInitiallyLoaded ? (
            <div style={{ textAlign: "center", padding: 20, color: "#666" }}>Click to load options...</div>
          ) : (
            <div style={{ textAlign: "center", padding: 20, color: "#666" }}>No options available</div>
          )}

          {!loading && !error && paginationEnabled && optionsToRender.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 8,
                paddingTop: 8,
                borderTop: "1px solid #eee",
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                style={{
                  padding: "4px 8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  opacity: page === 1 ? 0.5 : 1,
                }}
              >
                Prev
              </button>
              <span style={{ fontSize: "12px", color: "#666" }}>
                Page {page} of {Math.ceil(filteredOptions.length / PAGE_SIZE)}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page * PAGE_SIZE >= filteredOptions.length}
                style={{
                  padding: "4px 8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: page * PAGE_SIZE >= filteredOptions.length ? "not-allowed" : "pointer",
                  opacity: page * PAGE_SIZE >= filteredOptions.length ? 0.5 : 1,
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Inline buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          onClick={() => setPaginationEnabled((prev) => !prev)}
          style={{
            flex: 1,
            padding: "8px 12px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: 4,
            fontSize: "14px",
          }}
        >
          {paginationEnabled ? "Use Scroll" : "Use Pagination"}
        </button>

        <button
          onClick={handleSubmit}
          style={{
            flex: 1,
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: 4,
            fontSize: "14px",
          }}
        >
          Submit ({selected.length})
        </button>

        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            style={{
              flex: 1,
              padding: "8px 12px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: 4,
              fontSize: "14px",
            }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Searchable Combobox</h1>
      <AdvancedCombobox />
    </main>
  )
}
