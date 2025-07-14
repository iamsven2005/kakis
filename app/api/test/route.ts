import { type NextRequest, NextResponse } from "next/server"

// Mock user data
const allUsers = [
  { value: 1167, display: "acct", discription: "Desc1" },
  { value: -2, display: "administrator", discription: "Admin" },
  { value: 1373, display: "ambrose.howel" },
  { value: 1440, display: "atikaardianti.hadi" },
  { value: 1284, display: "ayekyi.tin" },
  { value: 1017, display: "benson" },
  { value: 1366, display: "bo.peng" },
  { value: 1269, display: "charles.chan" },
  { value: 1051, display: "cherelle" },
  { value: 1016, display: "chewboonfei", discription: "Manager" },
  { value: 1026, display: "chong" },
  { value: 1385, display: "chunyu.guo" },
  { value: 1424, display: "cindy.chin" },
  { value: 1073, display: "cuiyue" },
  { value: 1375, display: "daniel.thian" },
  { value: 1010, display: "david" },
  { value: 1013, display: "dexiang", discription: "IT" },
  { value: 1034, display: "dolly" },
  { value: 1456, display: "donald.chan" },
  { value: 1449, display: "donald.tse" },
  { value: 1380, display: "edmond.kwok" },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    // Filter users based on search term
    const filtered = allUsers.filter((user) => user.display.toLowerCase().includes(search.toLowerCase()))

    return NextResponse.json(filtered)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
