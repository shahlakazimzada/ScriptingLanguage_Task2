let jobIds = [];
let currentPage = 0;
const jobsPerPage = 6;

async function fetchJobIds() {
  const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
  jobIds = await response.json();
  loadMoreJobs();
}

async function fetchJobDetails(jobId) {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`);
  return response.json();
}

async function loadMoreJobs() {
  const jobList = document.getElementById('job-list');
  const start = currentPage * jobsPerPage;
  const end = start + jobsPerPage;

  const jobPromises = jobIds.slice(start, end).map(id => fetchJobDetails(id));
  const jobs = await Promise.all(jobPromises);

  jobs.forEach(job => {
    const jobElement = document.createElement('div');
    jobElement.classList.add('job');

    const jobTitle = job.url
      ? `<a href="${job.url}" target="_blank">${job.title}</a>`
      : job.title;
    jobElement.innerHTML = `
      <h2>${jobTitle}</h2>
      <p>Posted by: ${job.by}</p>
      <p>Posted at: ${new Date(job.time * 1000).toLocaleString()}</p>
    `;
    jobList.appendChild(jobElement);
  });

  currentPage++;
  if (currentPage * jobsPerPage >= jobIds.length) {
    document.getElementById('load-more').style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', fetchJobIds);
