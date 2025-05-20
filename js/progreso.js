const courses = {
  web: {
    name: "Web Development",
    total: 80,
    topics: [
      { name: "HTML & CSS", desc: "Structure and style basics", percent: 20 },
      { name: "JavaScript", desc: "Programming fundamentals", percent: 25 },
      { name: "Responsive Design", desc: "Mobile-first approach", percent: 20 },
      { name: "Frameworks", desc: "Intro to React or Vue", percent: 15 }
    ]
  },
  data: {
    name: "Data Science",
    total: 60,
    topics: [
      { name: "Python Programming", desc: "Syntax, functions", percent: 25 },
      { name: "Data Analysis", desc: "Pandas, Numpy", percent: 15 },
      { name: "Machine Learning", desc: "Intro to ML", percent: 10 },
      { name: "Visualization", desc: "Matplotlib, Seaborn", percent: 10 }
    ]
  },
  mobile: {
    name: "Mobile Development",
    total: 45,
    topics: [
      { name: "UI Design", desc: "Material Design", percent: 10 },
      { name: "Android", desc: "Kotlin or Java", percent: 15 },
      { name: "iOS", desc: "Swift basics", percent: 10 },
      { name: "Cross-platform", desc: "Flutter/React Native", percent: 10 }
    ]
  },
  cloud: {
    name: "Cloud Computing",
    total: 30,
    topics: [
      { name: "Cloud Basics", desc: "Concepts & benefits", percent: 10 },
      { name: "AWS", desc: "EC2, S3, Lambda", percent: 5 },
      { name: "Azure", desc: "App Services", percent: 10 },
      { name: "GCP", desc: "Google Cloud Intro", percent: 5 }
    ]
  }
};

function openModal(courseKey) {
  const course = courses[courseKey];
  document.getElementById('modal').style.display = 'flex';
  document.getElementById('modal-title').innerText = course.name;
  document.getElementById('modal-total-text').innerText = `${course.total}% Complete`;
  document.getElementById('modal-total-progress').style.width = `${course.total}%`;

  const topicsHTML = course.topics.map(topic => `
    <div>
      <div class="topic-title">${topic.name}</div>
      <div class="desc">${topic.desc}</div>
      <div class="progress-bar">
        <div class="progress" style="width: ${topic.percent}%;"></div>
      </div>
      <p>${topic.percent}% Complete</p>
    </div>
  `).join('');

  document.getElementById('modal-topics').innerHTML = topicsHTML;
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
