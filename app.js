// Linux Commands Data
const linuxCommands = {
    network_investigation: [
        {
            command: "netstat -tulnp",
            description: "List all listening ports and processes"
        },
        {
            command: "ss -tuln",
            description: "Modern alternative to netstat"
        },
        {
            command: "lsof -i",
            description: "List network connections and processes"
        },
        {
            command: "iftop -i eth0",
            description: "Monitor network traffic in real-time"
        },
        {
            command: "tcpdump -i any -w capture.pcap",
            description: "Capture network traffic to file"
        },
        {
            command: "nmap -sS -O target_ip",
            description: "Stealth scan with OS detection"
        }
    ],
    process_investigation: [
        {
            command: "ps aux",
            description: "List all running processes"
        },
        {
            command: "ps -ef --forest",
            description: "Show process tree"
        },
        {
            command: "pstree -p",
            description: "Display processes in tree format"
        },
        {
            command: "top -p $(pgrep -d, suspicious_process)",
            description: "Monitor specific process"
        },
        {
            command: "htop",
            description: "Interactive process viewer"
        },
        {
            command: "pgrep -fl malware",
            description: "Find processes by name pattern"
        }
    ],
    file_investigation: [
        {
            command: "find / -type f -mtime -1",
            description: "Find files modified in last 24 hours"
        },
        {
            command: "find /home -name '.*' -type f",
            description: "Find hidden files in user directories"
        },
        {
            command: "lsof +D /suspicious/directory",
            description: "List open files in directory"
        },
        {
            command: "stat /path/to/file",
            description: "Show detailed file information"
        },
        {
            command: "file /path/to/suspicious/file",
            description: "Determine file type"
        },
        {
            command: "md5sum /path/to/file",
            description: "Generate MD5 hash of file"
        }
    ],
    log_analysis: [
        {
            command: "grep -i 'failed\\|error\\|denied' /var/log/auth.log",
            description: "Search for authentication failures"
        },
        {
            command: "journalctl -f --grep='suspicious'",
            description: "Follow journal logs with filter"
        },
        {
            command: "awk '/CRON/ {print $0}' /var/log/syslog",
            description: "Extract cron job entries"
        },
        {
            command: "last -n 20",
            description: "Show recent login history"
        },
        {
            command: "grep 'sudo' /var/log/auth.log | tail -20",
            description: "Show recent sudo commands"
        },
        {
            command: "zgrep -i 'error' /var/log/*.gz",
            description: "Search compressed log files for errors"
        }
    ]
};

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const toolSections = document.querySelectorAll('.tool-section');
const commandCategory = document.getElementById('command-category');
const commandList = document.getElementById('command-list');

// Navigation functionality
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Hide all sections
            toolSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetSection = document.getElementById(link.dataset.section);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Add entrance animation
                targetSection.style.animation = 'none';
                setTimeout(() => {
                    targetSection.style.animation = 'fadeIn 0.5s ease-in-out';
                }, 10);
            }
            
            // Add laser effect to clicked nav item
            addLaserEffect(link);
        });
    });
}

// Add laser effect to elements
function addLaserEffect(element) {
    const laser = document.createElement('div');
    laser.style.cssText = `
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ffff, transparent);
        transform: translateY(-50%);
        animation: laserSweep 0.5s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(laser);
    
    setTimeout(() => {
        laser.remove();
    }, 500);
}

// Linux Commands Generator
function initCommandGenerator() {
    // Load initial commands
    loadCommands('network_investigation');
    
    // Handle category change
    commandCategory.addEventListener('change', (e) => {
        loadCommands(e.target.value);
        addGlowEffect(commandCategory);
    });
}

function loadCommands(category) {
    const commands = linuxCommands[category] || [];
    commandList.innerHTML = '';
    
    commands.forEach((cmd, index) => {
        const commandItem = createCommandItem(cmd, index);
        commandList.appendChild(commandItem);
        
        // Stagger animation
        setTimeout(() => {
            commandItem.style.opacity = '1';
            commandItem.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function createCommandItem(cmd, index) {
    const item = document.createElement('div');
    item.className = 'command-item';
    item.style.cssText = 'opacity: 0; transform: translateX(-20px); transition: all 0.3s ease;';
    
    item.innerHTML = `
        <div class="command-code">${escapeHtml(cmd.command)}</div>
        <div class="command-desc">${escapeHtml(cmd.description)}</div>
        <button class="copy-btn" onclick="copyToClipboard('${escapeHtml(cmd.command)}', this)">
            Copy Command
        </button>
    `;
    
    return item;
}

// Copy to clipboard functionality
async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);
        
        // Update button state
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        // Add laser pulse effect
        addLaserPulse(button);
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy text: ', err);
        button.textContent = 'Copy Failed';
        setTimeout(() => {
            button.textContent = 'Copy Command';
        }, 2000);
    }
}

// Add laser pulse effect
function addLaserPulse(element) {
    const pulse = document.createElement('div');
    pulse.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border: 2px solid #00ff00;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: pulseExpand 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(pulse);
    
    setTimeout(() => {
        pulse.remove();
    }, 600);
}

// Add glow effect
function addGlowEffect(element) {
    element.style.boxShadow = '0 0 20px #00ffff, 0 0 30px #00ffff';
    setTimeout(() => {
        element.style.boxShadow = '0 0 10px #00ffff';
    }, 300);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Matrix Rain Effect (Optional)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';
        
        for(let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Enhanced laser beam effects
function createLaserBeams() {
    const beamCount = 3;
    
    for(let i = 0; i < beamCount; i++) {
        setTimeout(() => {
            const beam = document.createElement('div');
            beam.style.cssText = `
                position: fixed;
                top: ${Math.random() * 100}%;
                left: -100px;
                width: 200px;
                height: 2px;
                background: linear-gradient(90deg, 
                    transparent, 
                    ${['#00ffff', '#00ff00', '#ff0040'][i]}, 
                    transparent);
                z-index: -1;
                animation: beamMove 4s linear infinite;
                box-shadow: 0 0 20px ${['#00ffff', '#00ff00', '#ff0040'][i]};
            `;
            
            document.body.appendChild(beam);
            
            setTimeout(() => {
                beam.remove();
            }, 4000);
        }, i * 1500);
    }
}

// Keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Alt + number keys for quick navigation
        if (e.altKey && e.key >= '1' && e.key <= '5') {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            const navLink = navLinks[index];
            if (navLink) {
                navLink.click();
            }
        }
        
        // Ctrl + C in command generator for copying all commands
        if (e.ctrlKey && e.key === 'c' && e.target.closest('.command-generator')) {
            const activeCommands = document.querySelectorAll('.command-code');
            if (activeCommands.length > 0) {
                const allCommands = Array.from(activeCommands)
                    .map(cmd => cmd.textContent)
                    .join('\n');
                copyToClipboard(allCommands, document.querySelector('.copy-btn'));
            }
        }
    });
}

// Performance monitoring and optimization
function initPerformanceOptimization() {
    // Lazy load heavy effects
    let matrixEnabled = false;
    
    // Enable matrix effect after user interaction
    document.addEventListener('click', () => {
        if (!matrixEnabled) {
            createMatrixRain();
            matrixEnabled = true;
        }
    }, { once: true });
    
    // Throttled laser beam creation
    let beamTimeout;
    document.addEventListener('mousemove', () => {
        clearTimeout(beamTimeout);
        beamTimeout = setTimeout(() => {
            if (Math.random() > 0.95) {
                createLaserBeams();
            }
        }, 100);
    });
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCommandGenerator();
    initKeyboardShortcuts();
    initPerformanceOptimization();
    
    // Add welcome effect
    setTimeout(() => {
        const welcomeLaser = document.createElement('div');
        welcomeLaser.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 2px;
            height: 2px;
            background: #00ffff;
            transform: translate(-50%, -50%);
            animation: welcomeExplosion 1s ease-out;
            z-index: 1000;
            pointer-events: none;
            box-shadow: 0 0 50px #00ffff;
        `;
        
        document.body.appendChild(welcomeLaser);
        
        setTimeout(() => {
            welcomeLaser.remove();
        }, 1000);
    }, 500);
    
    console.log('%c🔥 CYBER LASER TOOLKIT ACTIVATED 🔥', 'color: #00ffff; font-size: 16px; font-weight: bold;');
    console.log('%cSystem ready for digital investigation...', 'color: #00ff00;');
});

// CSS Animations added via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes laserSweep {
        0% { width: 0; opacity: 1; }
        100% { width: 100%; opacity: 0; }
    }
    
    @keyframes pulseExpand {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 40px; height: 40px; opacity: 0; }
    }
    
    @keyframes beamMove {
        0% { left: -200px; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { left: 100vw; opacity: 0; }
    }
    
    @keyframes welcomeExplosion {
        0% { 
            width: 2px; 
            height: 2px; 
            opacity: 1; 
            box-shadow: 0 0 50px #00ffff;
        }
        100% { 
            width: 200px; 
            height: 200px; 
            opacity: 0; 
            box-shadow: 0 0 200px #00ffff;
        }
    }
`;
document.head.appendChild(style);

// Make functions globally accessible
window.copyToClipboard = copyToClipboard;