import { jobs } from "./data/job.js";

const jobListContainer = document.getElementById('jobList');
    const searchInput = document.getElementById('searchInput');
    const filterLocation = document.getElementById('filterLocation');
    const filterJobType = document.getElementById('filterJobType');
    const filterCategory = document.getElementById('filterCategory');
    const modal = document.getElementById('applicationModal');
    const closeModal = document.getElementById('closeModal');
    const jobIdField = document.getElementById('jobId');
    let selectedJobId = null;

    renderFilters();

    function renderFilters() {
      const locations = [...new Set(jobs.map(job => job.location))];
      const jobTypes = [...new Set(jobs.map(job => job.jobType))];
      const categories = [...new Set(jobs.map(job => job.category))];

      function generateOptions(defaultOption, values) {
        return `<option value="">${defaultOption}</option>` +
              values.map(value => `<option value="${value}">${value}</option>`).join('');
      }

      document.querySelector("#filterLocation").innerHTML = generateOptions("All Locations", locations);
      document.querySelector("#filterJobType").innerHTML = generateOptions("All Job Types", jobTypes);
      document.querySelector("#filterCategory").innerHTML = generateOptions("All Categories", categories);
    }


    function renderJobs() {
      const searchTerm = searchInput.value.toLowerCase();
      const locationFilter = filterLocation.value;
      const jobTypeFilter = filterJobType.value;
      const categoryFilter = filterCategory.value;
      
      jobListContainer.innerHTML = '';
      
      const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm);
        const matchesLocation = locationFilter ? job.location === locationFilter : true;
        const matchesJobType = jobTypeFilter ? job.jobType === jobTypeFilter : true;
        const matchesCategory = categoryFilter ? job.category === categoryFilter : true;
        return matchesSearch && matchesLocation && matchesJobType && matchesCategory;
      });
      
      if(filteredJobs.length === 0) {
        jobListContainer.innerHTML = '<p style="padding: 20px;">No jobs found.</p>';
        return;
      }
      
      filteredJobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
          <h3>${job.title}</h3>
          <p><strong>${job.company}</strong> &bullet; ${job.location} &bullet; ${job.jobType} &bullet; ${job.category}</p>
          <p>${job.description}</p>
          <a href="${job.jobApplyLink}" target="_black">
            <button class="apply-button" data-id="${job.id}">Apply</button>
          </a>
        `;
        jobListContainer.appendChild(card);
      });
    }

    // Toggle the mobile menu
function toggleMenu() {
  document.querySelector('.navbar').classList.toggle('active');
}

// Close the mobile menu when a navigation link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.navbar').classList.remove('active');
  });
});

    
    
    function openApplicationModal(jobId) {
      selectedJobId = jobId;
      // Set the hidden jobId field value in the form
      jobIdField.value = jobId;
      modal.style.display = 'flex';
    }
    
    closeModal.onclick = function() {
      modal.style.display = 'none';
    };
    
    window.onclick = function(event) {
      if(event.target === modal) {
        modal.style.display = 'none';
      }
    };
  
    
    searchInput.addEventListener('input', renderJobs);
    filterLocation.addEventListener('change', renderJobs);
    filterJobType.addEventListener('change', renderJobs);
    filterCategory.addEventListener('change', renderJobs);
    
    renderJobs();