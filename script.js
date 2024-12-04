document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
  });

  // Initialize team terminal functionality
  const teamMembers = document.querySelectorAll('.team-member-card');
  console.log('Found team members:', teamMembers.length); // Debug log

  teamMembers.forEach(member => {
    member.addEventListener('click', () => {
      console.log('Member clicked:', member.dataset); // Debug log
      createTerminalModal(member.dataset);
    });
  });

  // Initialize other functions
  createGlowDots();
  createMatrixRain();
  initMobileNav();
  initParallax();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-md');
    } else {
      navbar.classList.remove('shadow-md');
    }
  });

  // Responsive handling
  window.addEventListener('resize', () => {
    const canvas = document.querySelector('.matrix-rain');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

  createDataStreams();
  updateLiveTerminal();
});

// Terminal Modal Creation Function
function createTerminalModal(memberData) {
  console.log('Creating terminal for:', memberData);

  const terminal = document.createElement('div');
  terminal.className = 'terminal-modal';

  const content = `
      <div class="terminal-window">
          <div class="terminal-header">
              <div class="terminal-buttons">
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
              <div class="terminal-title">fashol@tech-division: ~/team/members</div>
          </div>
          <div class="terminal-content">
              <div class="command-line">
                  <span class="prompt">fashol@tech-division:~/team/members$</span>
                  <span class="command"></span>
              </div>
              <div class="terminal-output"></div>
          </div>
      </div>
  `;

  terminal.innerHTML = content;
  document.body.appendChild(terminal);

  requestAnimationFrame(() => {
    terminal.classList.add('active');
  });

  // More realistic terminal commands
  const commands = [
    'sudo authenticate --user=admin',
    'ssh secure.fashol.tech',
    `cat /team/profiles/${memberData.id}.json`,
    'decrypt --key=TEAM_ACCESS profile.encrypted'
  ];

  const commandLine = terminal.querySelector('.command');
  const output = terminal.querySelector('.terminal-output');

  let commandIndex = 0;
  let charIndex = 0;

  function typeCommand() {
    if (commandIndex < commands.length) {
      const command = commands[commandIndex];
      if (charIndex < command.length) {
        commandLine.textContent += command[charIndex];
        charIndex++;
        setTimeout(typeCommand, 50);
      } else {
        setTimeout(executeCommand, 500);
      }
    }
  }

  function executeCommand() {
    const command = commands[commandIndex];
    commandLine.textContent = '';
    charIndex = 0;
    commandIndex++;

    if (command.includes('sudo authenticate')) {
      output.innerHTML += `
              <div class="terminal-line">$ Authenticating admin access...</div>
              <div class="terminal-line">$ Access granted ✓</div>
          `;
      setTimeout(typeCommand, 800);
    }
    else if (command.includes('ssh')) {
      output.innerHTML += `
              <div class="terminal-line">$ Establishing secure connection...</div>
              <div class="terminal-line">$ Connected to Fashol Tech secure server</div>
              <div class="terminal-line">$ Welcome to Fashol Tech Division - Secure Shell</div>
          `;
      setTimeout(typeCommand, 1000);
    }
    else if (command.includes('cat')) {
      output.innerHTML += `
              <div class="terminal-line">$ Fetching team member profile...</div>
              <div class="terminal-line">$ Profile found: ${memberData.name}</div>
              <div class="terminal-line">$ Encrypted data retrieved successfully</div>
          `;
      setTimeout(typeCommand, 800);
    }
    else if (command.includes('decrypt')) {
      setTimeout(() => {
        output.innerHTML += `
                  <div class="terminal-line">$ Decrypting profile data...</div>
                  <div class="terminal-line">$ Decryption successful</div>
                  <div class="member-profile">
                      <div class="profile-header">
                          <div class="profile-image">
                              <img src="${memberData.image}" alt="${memberData.name}">
                          </div>
                          <div class="profile-info">
                              <h3>${memberData.name}</h3>
                              <p class="role">${memberData.role}</p>
                          </div>
                      </div>
                      <div class="profile-details">
                          <div class="detail-item">
                              <span class="label">Expertise:</span>
                              <span class="value">${memberData.expertise}</span>
                          </div>
                          <div class="detail-item">
                              <span class="label">Projects:</span>
                              <span class="value">${memberData.projects}</span>
                          </div>
                          <div class="detail-item">
                              <span class="label">Tech Stack:</span>
                              <span class="value">${memberData.stack}</span>
                          </div>
                      </div>
                      <div class="profile-actions">
                          <button class="view-portfolio-btn" onclick="window.location.href='/portfolio/${memberData.id}'">
                              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                              </svg>
                              View Portfolio
                          </button>
                      </div>
                  </div>
              `;
      }, 1000);
    }
  }

  setTimeout(typeCommand, 500);

  terminal.addEventListener('click', (e) => {
    if (e.target === terminal) {
      terminal.classList.remove('active');
      setTimeout(() => terminal.remove(), 500);
    }
  });
}

// Keep your existing helper functions here
function createGlowDots() { /* ... */ }
function createMatrixRain() { /* ... */ }
function initMobileNav() { /* ... */ }
function initParallax() { /* ... */ }

function createDataStreams() {
  const container = document.querySelector('.data-streams');
  const streamCount = 20;

  for (let i = 0; i < streamCount; i++) {
    const stream = document.createElement('div');
    stream.className = 'data-stream';
    stream.style.left = `${Math.random() * 100}%`;
    stream.style.height = `${Math.random() * 20 + 10}%`;
    stream.style.opacity = Math.random() * 0.5;
    stream.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(stream);
  }
}

function updateLiveTerminal() {
  const terminal = document.getElementById('liveTerminal');
  const logs = [
    'Monitoring system health...',
    'Running integrity checks...',
    'Updating service registry...',
    'Optimizing database queries...',
    'Scaling containers...',
    'Processing queue jobs...'
  ];

  let index = 0;

  function addLog() {
    const log = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString();
    log.innerHTML = `<span class="text-accent">[${timestamp}]</span> ${logs[index]}`;
    terminal.appendChild(log);
    terminal.scrollTop = terminal.scrollHeight;
    index = (index + 1) % logs.length;
  }

  setInterval(addLog, 2000);
}
