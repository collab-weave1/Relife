import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export const ExportButtons = ({ data }) => {
  const handleCSV = () => {
    if (!data || data.length === 0) return

    // Build header row
    const headers = Object.keys(data[0])

    // Quote any field that contains comma or quote
    const quote = (str) => {
      const s = String(str)
      if (/[,"\r\n]/.test(s)) {
        return `"${s.replace(/"/g, '""')}"`
      }
      return s
    }

    // Construct CSV rows
    const rows = data.map((row) =>
      headers.map((h) => quote(row[h])).join(",")
    )

    const csvBody = [headers.join(","), ...rows].join("\r\n")
    const csv = "\uFEFF" + csvBody
    
    // Download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "report.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handlePDF = () => {
    if (!data || data.length === 0) return

    // Sanitize any headers with subscript to plain
    const rawHeaders = Object.keys(data[0])
    const headers = rawHeaders.map(h => h.replace(/₂/g, "2"))

    // Sanitize each data row in the same way
    const body = data.map(row =>
      rawHeaders.map(key => {
        let val = row[key]
        //Saved field, remove subscript
        if (typeof val === "string") {
          val = val.replace(/₂/g, "2")
        }
        return val
      })
    )

    // Generate PDF
    const doc = new jsPDF()
    doc.text("ReLife Admin Report", 14, 16)
    autoTable(doc, {
      head: [headers],
      body: body,
      margin: { top: 30 },
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] }
    })
    doc.save("report.pdf")
  }

  return (
    <div className="flex gap-4 mt-4">
      <button
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        onClick={handleCSV}
      >
        Download CSV
      </button>
      <button
        className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        onClick={handlePDF}
      >
        Download PDF
      </button>
    </div>
  )
}
