var fs = require("fs");
var Handlebars = require("handlebars");

PREPEND_SUMMARY_CATEGORIES = [
  "work",
  "volunteer",
  "awards",
  "publications"
];

function validateArray(arr) {
  return arr !== undefined && arr !== null && arr instanceof Array && arr.length > 0;
}

function render(resume) {
  PREPEND_SUMMARY_CATEGORIES.forEach(function(category) {
    if (resume[category] !== undefined) {
      resume[category].forEach(function(block) {
        if (block.highlights === undefined) {
          block.highlights = [];
        }
        // Don't add summary to highlights or delete it
      });
    }
  });

  if (resume.basics) {
    if (!Array.isArray(resume.basics.highlights)) {
      resume.basics.highlights = [];
    }
    var summaryText = resume.basics.summary && String(resume.basics.summary).trim();
    resume.basics._showExecutiveSummary =
      !!summaryText || resume.basics.highlights.length > 0;
  }

  if (resume.recognition) {
    if (!Array.isArray(resume.recognition.highlights)) {
      resume.recognition.highlights = [];
    }
    var rec = resume.recognition;
    var recTitle = rec.title && String(rec.title).trim();
    var recSummary = rec.summary && String(rec.summary).trim();
    resume.recognition._showRecognition =
      !!recTitle || !!recSummary || rec.highlights.length > 0;
  }

  if (resume.leadership) {
    if (!Array.isArray(resume.leadership.highlights)) {
      resume.leadership.highlights = [];
    }
    var led = resume.leadership;
    var ledTitle = led.title && String(led.title).trim();
    var ledSummary = led.summary && String(led.summary).trim();
    resume.leadership._showLeadership =
      !!ledTitle || !!ledSummary || led.highlights.length > 0;
  }

	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};
