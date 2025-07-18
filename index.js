var fs = require("fs");
var Handlebars = require("handlebars");

COURSES_COLUMNS = 3;

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
  // Split courses into 3 columns
  if (validateArray(resume.education)) {
    resume.education.forEach(function(block) {
      if (validateArray(block.courses)) {
        splitCourses = [];
        columnIndex = 0;
        for (var i = 0; i < COURSES_COLUMNS; i++) {
          splitCourses.push([]);
        }
        block.courses.forEach(function(course) {
          splitCourses[columnIndex].push(course);
          columnIndex++;
          if (columnIndex >= COURSES_COLUMNS) {
            columnIndex = 0;
          }
        });
        block.courses = splitCourses;
      }
    });
  }

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
