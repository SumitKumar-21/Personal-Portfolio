const Resume = require("../models/resume");

module.exports.displayResume = async (req, res) => {
  try {
    const resumeData = await Resume.findOne({}).sort({ _id: -1 });
    res.render("navTabs/resume.ejs", { resumeData });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Proxy endpoint: fetches the PDF from Cloudinary and serves it
// with correct headers so the browser can display it inline.
module.exports.viewResumePdf = async (req, res) => {
  try {
    const resumeData = await Resume.findOne({}).sort({ _id: -1 });

    if (!resumeData?.resume?.url) {
      return res.status(404).send("No resume found");
    }

    const pdfUrl = resumeData.resume.url;

    console.log("[resume proxy] Fetching PDF from:", pdfUrl);

    // fetch follows redirects automatically
    const pdfResponse = await fetch(pdfUrl);

    console.log("[resume proxy] Response status:", pdfResponse.status);
    console.log("[resume proxy] Response headers:", Object.fromEntries(pdfResponse.headers.entries()));

    if (!pdfResponse.ok) {
      console.log("[resume proxy] Response body:", await pdfResponse.text());
      return res.status(502).send("Could not fetch resume from storage");
    }

    const isDownload = req.query.download === "1";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      isDownload
        ? 'attachment; filename="resume.pdf"'
        : 'inline; filename="resume.pdf"'
    );

    const buffer = Buffer.from(await pdfResponse.arrayBuffer());
    res.send(buffer);
  } catch (err) {
    console.error("Error proxying resume PDF:", err);
    res.status(500).send("Server Error");
  }
};
