import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useCurrency } from "@/context/CurrencyContext";

function DownloadPDF({ trip }) {
  const { currency, convert } = useCurrency();

  // ✅ Helper: simple number + currency code (no long formatting)
  const safeConvert = (value) => {
    if (!value) return "N/A";

    const match = String(value).replace(/[^0-9.]/g, "");
    const num = parseFloat(match);

    if (isNaN(num)) return value;

    const converted = convert(num);

    return `${converted} ${currency}`; // simple short format
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("TripEase Itinerary", 14, 20);

    // Trip Info
    const destination =
      typeof trip?.userSelection?.location === "object"
        ? trip?.userSelection?.location?.label ||
          trip?.userSelection?.location?.name ||
          JSON.stringify(trip?.userSelection?.location)
        : trip?.userSelection?.location || "N/A";

    const days =
      trip?.userSelection?.days && !isNaN(trip?.userSelection?.days)
        ? trip?.userSelection?.days
        : trip?.tripData?.itinerary?.length || "N/A";

    doc.setFontSize(12);
    doc.text(`Destination: ${destination}`, 14, 30);
    doc.text(`Duration: ${days} Days`, 14, 38);

    let yPos = 50;

    // ✅ Cost Breakdown Section
    if (trip?.tripData?.cost_breakdown) {
      doc.setFontSize(14);
      doc.text("Estimated Cost Breakdown", 14, yPos);

      const costData = trip.tripData.cost_breakdown;
      const totalValue = costData.total || costData.Total || null;
      const otherCosts = Object.entries(costData).filter(
        ([key]) => key.toLowerCase() !== "total"
      );

      autoTable(doc, {
        head: [["Category", `Estimated Cost (${currency})`]],
        body: otherCosts.map(([key, value]) => [
          key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          safeConvert(value),
        ]),
        startY: yPos + 5,
        theme: "grid",
        styles: { fontSize: 10 },
      });

      yPos = doc.lastAutoTable.finalY + 5;

      if (totalValue) {
        autoTable(doc, {
          body: [["Total", safeConvert(totalValue)]],
          startY: yPos,
          theme: "grid",
          styles: { fontSize: 12, halign: "right" },
          columnStyles: {
            0: { fontStyle: "bold", fillColor: [200, 220, 255] },
            1: { fontStyle: "bold", fillColor: [200, 220, 255] },
          },
        });

        yPos = doc.lastAutoTable.finalY + 15;
      }
    }

    // ✅ Itinerary Section
    trip?.tripData?.itinerary?.forEach((day, i) => {
      doc.setFontSize(14);
      doc.text(day.day || `Day ${i + 1}`, 14, yPos);

      const rows =
        day.plan?.map((p) => [
          p.place || "-",
          p.details || "-",
          safeConvert(p.ticket_pricing),
        ]) || [];

      autoTable(doc, {
        head: [["Place", "Details", `Ticket (${currency})`]],
        body: rows,
        startY: yPos + 5,
        theme: "grid",
        styles: { fontSize: 10 },
      });

      yPos = doc.lastAutoTable.finalY + 10;
    });

    // Save file
    doc.save("itinerary.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 
                 text-white font-medium shadow-lg hover:scale-105 transition-all duration-300
                 dark:from-indigo-500 dark:to-purple-600"
    >
      Download Itinerary (PDF)
    </button>
  );
}

export default DownloadPDF;
