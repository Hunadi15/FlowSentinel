document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Tab Switching Logic
    const navLinks = document.querySelectorAll('.nav-links li');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');

    const tabMetadata = {
        overview: { title: 'Command Center', subtitle: 'Real-time traffic governance and policy enforcement.' },
        policies: { title: 'Traffic Policies', subtitle: 'Define and manage granular rate limits and security rules.' },
        analytics: { title: 'Fleet Analytics', subtitle: 'Deep dive into traffic patterns and usage metrics.' },
        abuse: { title: 'Threat Intelligence', subtitle: 'Automated abuse detection and anomaly scoring.' },
        settings: { title: 'System Settings', subtitle: 'Configure core sentinel clusters and global defaults.' }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');

            // Update Sidebar
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update Content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });

            // Update Header
            if (tabMetadata[tabId]) {
                pageTitle.textContent = tabMetadata[tabId].title;
                pageSubtitle.textContent = tabMetadata[tabId].subtitle;
            }
        });
    });

    // handle search filter
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.policy-table tbody tr');
        rows.forEach(row => {
            const name = row.children[0].textContent.toLowerCase();
            row.style.display = name.includes(filter) ? '' : 'none';
        });
    });

    // policy modal logic
    const modal = document.getElementById('policy-modal');
    const btnNew = document.getElementById('btn-new-policy');
    const btnCancel = document.getElementById('btn-cancel');
    const form = document.getElementById('policy-form');
    const modalTitle = document.getElementById('modal-title');
    let editingRow = null;

    function openModal(editRow = null) {
        editingRow = editRow;
        if (editRow) {
            modalTitle.textContent = 'Edit Policy';
            // populate fields
            document.getElementById('policy-name').value = editRow.querySelector('td').textContent;
            document.getElementById('policy-scope').value = editRow.children[1].textContent;
            document.getElementById('policy-limit').value = editRow.children[2].textContent.split(' ')[0];
            document.getElementById('policy-window').value = editRow.children[3].textContent;
            document.getElementById('policy-action').value = editRow.children[4].textContent;
            document.getElementById('policy-status').value = editRow.children[5].textContent;
        } else {
            modalTitle.textContent = 'Create Policy';
            form.reset();
        }
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        editingRow = null;
    }

    btnNew.addEventListener('click', () => openModal());
    btnCancel.addEventListener('click', closeModal);
    modal.addEventListener('click', event => {
        if (event.target === modal) closeModal();
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('policy-name').value;
        const scope = document.getElementById('policy-scope').value;
        const limit = document.getElementById('policy-limit').value;
        const windowVal = document.getElementById('policy-window').value;
        const action = document.getElementById('policy-action').value;
        const status = document.getElementById('policy-status').value;

        const badgeClass = {
            'Allow': 'blue',
            'Throttle': 'purple',
            'Block': 'red'
        }[action] || 'blue';
        const scopeClass = {
            'Global': 'blue',
            'UserTier': 'green',
            'Abuse': 'red'
        }[scope] || 'blue';

        function buildRow() {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${name}</td>
                <td><span class="badge ${scopeClass}">${scope}</span></td>
                <td>${limit} req</td>
                <td>${windowVal}</td>
                <td><span class="badge ${badgeClass}">${action}</span></td>
                <td><span class="${status === 'Active' ? 'status-on' : ''}">${status}</span></td>
                <td><i class="action-icon" data-lucide="more-vertical"></i></td>
            `;
            attachRowListeners(tr);
            return tr;
        }

        if (editingRow) {
            const newRow = buildRow();
            editingRow.replaceWith(newRow);
        } else {
            const tbody = document.querySelector('.policy-table tbody');
            tbody.appendChild(buildRow());
        }
        lucide.createIcons();
        closeModal();
    });

    // attach listeners for existing rows
    function attachRowListeners(row) {
        const icon = row.querySelector('.action-icon');
        icon.addEventListener('click', () => {
            const confirmDelete = confirm('Delete this policy?');
            if (confirmDelete) {
                row.remove();
            }
        });
        // double-click row to edit
        row.addEventListener('dblclick', () => openModal(row));
    }

    document.querySelectorAll('.policy-table tbody tr').forEach(attachRowListeners);

    // Simulate Real-time Stats Updates
    const totalReqEl = document.getElementById('total-req');
    const blockedReqEl = document.getElementById('blocked-req');
    const avgLatencyEl = document.getElementById('avg-latency');

    let totalRequests = 1245600;
    let totalBlocked = 4230;

    setInterval(() => {
        // Random incremental traffic
        const newReq = Math.floor(Math.random() * 5);
        const newBlocked = Math.random() > 0.9 ? 1 : 0;

        totalRequests += newReq;
        totalBlocked += newBlocked;

        totalReqEl.textContent = (totalRequests / 1000000).toFixed(2) + 'M';
        blockedReqEl.textContent = (totalBlocked / 1000).toFixed(1) + 'k';

        // Slightly fluctuate latency
        const latency = 20 + Math.floor(Math.random() * 8);
        avgLatencyEl.textContent = latency + 'ms';
        
        // Randomize chart bars slightly to look "alive"
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            if (Math.random() > 0.7) {
                const currentHeight = parseInt(bar.style.height);
                const delta = (Math.random() * 10) - 5;
                const newHeight = Math.min(Math.max(currentHeight + delta, 20), 95);
                bar.style.height = newHeight + '%';
            }
        });
    }, 2000);

    // Add some "Entrance" logs to the console for senior engineering feel
    console.log('%c🚦 FlowSentinel Dashboard Initialized', 'color: #0076ff; font-size: 20px; font-weight: bold;');
    console.log('%cConnected to Control Plane: %clocalhost:5000', 'color: #a8a8a8;', 'color: #0076ff;');
    console.log('%cCluster: %cFS-EPU-WEST-01', 'color: #a8a8a8;', 'color: #8a3ffc;');
});
