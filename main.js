document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll reveal animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(
        entries,
        observer
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    },
    revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Project Modal Data
    const projectData = {
        'med-fixtures': {
            title: 'Medical Manufacturing: Laser Marking Fixtures',
            images: ['fixture_1.jpg', 'fixture_2.jpg', 'fixture_3.jpg', 'fixture_4.jpg', 'fixture_5.jpg', 'fixture_6.jpg', 'fixture_7.jpg'],
            tags: ['SolidWorks', 'Rapid Prototyping', 'Fixture Design'],
            description: `
                <p>This section showcases a collection of custom 3D printed tooling I designed in SolidWorks. Every fixture shown here was specifically engineered to securely hold, nest, and precisely align various medical components during the laser marking process.</p>
                <p>These models highlight my proficiency in 3D modeling, rapid prototyping, and designing robust, repeatable solutions tailored to strict manufacturing constraints.</p>
            `
        },
        'vex': {
            title: 'Robotics Competition Project',
            images: ['vex_1.jpg', 'vex_2.jpg', 'vex_3.jpg', 'vex_4.jpg', 'vex_5.jpg', 'vex_6.jpg'],
            tags: ['Robotics', 'FEA', 'Fatigue Analysis', 'Mechanical Design'],
            description: `
                <p>As part of a senior design project, our team designed a fully autonomous robot integrating ME, EE, and CS disciplines. The robot featured a mobile goal clamp, a ring feeder system, and advanced sensors (LiDAR, GPS, AI Vision) for navigation. My primary focus was the design and analysis of the <strong>pneumatic climbing mechanism</strong>.</p>
                <p><strong>Key Engineering Highlights:</strong></p>
                <ul>
                    <li>Optimized the geometry and actuator placement of the climbing arm to maximize mechanical advantage for repeatable lifting performance.</li>
                    <li>Conducted comprehensive stress analysis (FEA) on the arm assembly to determine the failure sequence during critical load stages (Impact, Pull-Up, and Jump).</li>
                    <li>Applied fatigue analysis using Palmgren-Miner rules to verify an appropriate lifespan for the pivot holes and steel piston under rigorous competition loading conditions.</li>
                </ul>
                <a href="VEX_Final_Report.pdf" target="_blank" class="cta-button outline" style="margin-top: 1rem; display: inline-block;">Read the Full Engineering Report</a>
            `
        },
        'heat-exchanger': {
            title: 'Double Pass Heat Exchanger',
            images: ['he_1.jpg', 'he_2.jpg', 'he_3.jpg', 'he_4.jpg', 'he_5.jpg'],
            tags: ['Thermodynamics', 'Fabrication', 'Testing'],
            description: `
                <p>Designed and built a multi-pass shell and tube heat exchanger, rigorously adhering to a strict 18-inch length constraint.</p>
                <p><strong>Key Engineering Highlights:</strong></p>
                <ul>
                    <li>Optimized the internal layout using 3/8" copper tubing and calculated ideal tube spacing to maximize surface area and heat transfer.</li>
                    <li>Iterated through fabrication challenges: when initial pipe bending radii caused cracking, the design was adapted to a chambered parallel/counter flow design to utilize all pipes effectively.</li>
                    <li>Validated performance using a custom test bench with dual sinks and temperature probes, successfully calculating heat transfer coefficients and overall efficiency.</li>
                </ul>
            `
        },
        'lancia': {
            title: 'Lancia Fulvia Engine',
            images: ['lancia_0.jpg', 'lancia_1.jpg', 'lancia_2.jpg', 'lancia_3.jpg', 'lancia_4.jpg', 'lancia_5.jpg', 'lancia_6.jpg', 'lancia_7.jpg', 'lancia_8.jpg', 'lancia_9.jpg', 'lancia_10.jpg', 'lancia_11.jpg', 'lancia_12.jpg'],
            tags: ['CAD', 'Reverse Engineering', 'Kinematics'],
            description: `
                <p>Modeled a complete V4 Lancia Fulvia Engine assembly in Autodesk Inventor and analyzed internal stresses during operation.</p>
                <p><strong>Key Engineering Highlights:</strong></p>
                <ul>
                    <li>Modeled the crankshaft, pistons, connecting rods, and flywheel components with precise tolerances.</li>
                    <li>Utilized thermodynamic principles to calculate peak cylinder pressure (approx. 800 psi) and combustion forces at Top Dead Center (TDC).</li>
                    <li>Performed finite element analysis (FEA) on the connecting rods under combustion loading, and executed dynamic simulations to analyze stress variations.</li>
                    <li>Validated the computer FEA results with rigorous hand calculations utilizing mathematical energy methods, achieving excellent agreement between the two.</li>
                </ul>
            `
        },
        'exp-dic': {
            title: 'Digital Image Correlation Lab',
            images: ['dic_1.jpg', 'dic_2.jpg', 'dic_3.jpg', 'dic_4.jpg', 'dic_5.jpg', 'dic_6.jpg'],
            tags: ['Digital Image Correlation', 'MATLAB', 'Strain Measurement'],
            description: `
                <p>This project focused on modern optical techniques for measuring material deformation without physical contact.</p>
                <p><strong>Key Engineering Highlights:</strong></p>
                <ul>
                    <li>Performed non-contact optical measurement techniques to analyze full-field displacement and strain patterns in materials under tensile loading.</li>
                    <li>Utilized MATLAB-based Ncorr software to process the visual data.</li>
                    <li>Successfully identified and quantified stress concentrations around geometric discontinuities and material heterogeneities.</li>
                </ul>
            `
        },
        'exp-moire': {
            title: 'Moiré Interferometry',
            images: ['moire_3.jpg', 'moire_2.jpg', 'moire_1.jpg'],
            tags: ['Optics', 'Interferometry', 'Data Analysis'],
            description: `
                <p>An in-depth laboratory analysis utilizing the phenomenon of Moiré fringes to measure microscopic deformations.</p>
                <p><strong>Key Engineering Highlights:</strong></p>
                <ul>
                    <li>Analyzed complex fringe patterns generated by overlapping gratings to determine precise in-plane displacements.</li>
                    <li>Calculated strain concentrations on test specimens using optical interference techniques.</li>
                    <li>Documented findings and generated visual representations of the strain fields.</li>
                </ul>
            `
        },
        'exp-strain': {
            title: 'Strain Gauge Lab',
            images: ['strain_0.jpg', 'strain_1.jpg', 'strain_2.jpg', 'strain_3.jpg'],
            tags: ['Strain Gauges', 'Circuit Analysis', 'Material Properties'],
            description: `
                <p>A rigorous experimental setup to directly measure material strain using electrical resistance gauges.</p>
                <p><strong>Key Engineering Highlights:</strong></p>
                <ul>
                    <li>Designed and analyzed Wheatstone bridge circuits to translate minute resistance changes into readable voltage signals.</li>
                    <li>Performed shunt calibration to ensure high accuracy of the strain measurements.</li>
                    <li>Constructed detailed stress-strain curves using MATLAB, comparing theoretical material properties with empirical data.</li>
                </ul>
            `
        },
        'exp-osc': {
            title: 'Signal Analysis and Processing Using Oscilloscope',
            images: ['osc_3.jpg', 'osc_2.jpg', 'osc_1.jpg'],
            tags: ['Signal Processing', 'Data Acquisition', 'Electronics'],
            description: `
                <p>Focused on the capture and processing of high-speed dynamic signals in mechanical and electronic systems.</p>
                <p><strong>Key Engineering Highlights:</strong></p>
                <ul>
                    <li>Applied oscilloscope measurement techniques to capture, visualize, and process dynamic voltage-time signals.</li>
                    <li>Analyzed the frequency response and transient behaviors of test circuits.</li>
                    <li>Utilized MATLAB to graph and interpret the acquired signal data for mechanical system analysis.</li>
                </ul>
            `
        },
        'cad-practice': {
            title: 'Various CAD Practice Models',
            images: ['cad_practice_1.jpg', 'cad_practice_2.jpg', 'cad_practice_3.jpg', 'cad_practice_4.jpg', 'cad_practice_5.jpg', 'cad_practice_6.jpg', 'cad_practice_7.jpg', 'cad_practice_8.jpg', 'cad_practice_9.jpg', 'cad_practice_10.jpg', 'cad_practice_11.jpg', 'cad_practice_12.jpg', 'cad_practice_13.jpg', 'cad_practice_14.jpg', 'cad_practice_15.jpg', 'cad_practice_16.jpg', 'cad_practice_17.jpg', 'cad_practice_18.jpg', 'cad_practice_19.jpg', 'cad_practice_20.jpg', 'cad_practice_21.jpg', 'cad_practice_22.jpg', 'cad_practice_23.jpg'],
            tags: ['SolidWorks', 'CAD Modeling'],
            description: `
                <p>A collection of CAD parts modeled in SolidWorks to continually practice, test, and tune my 3D modeling skills.</p>
                <p><strong>Key Engineering Highlights:</strong></p>
                <ul>
                    <li>Modeled complex geometries and assemblies focusing on best practices and feature tree organization.</li>
                    <li>Completed several parts from the annual SolidWorks Model Mania competitions, prioritizing both speed and accuracy.</li>
                    <li>Utilized advanced modeling features including lofting, surfacing, and sheet metal to build robust and easily modifiable parts.</li>
                </ul>
            `
        }
    };

    // Modal Elements
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDescription = document.getElementById('modal-description');
    const projectCards = document.querySelectorAll('.project-card');

    // Open Modal
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            const data = projectData[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalTags.innerHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                modalDescription.innerHTML = data.description;
                
                const modalGallery = document.getElementById('modal-gallery');
                if (data.images && data.images.length > 0) {
                    modalGallery.innerHTML = data.images.map(img => `<img src="${img}" style="width: 100%; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 4px 15px rgba(0,0,0,0.5);">`).join('');
                } else {
                    modalGallery.innerHTML = '<div class="gallery-placeholder">Images coming soon...</div>';
                }
                
                modal.showModal();
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal
    const closeModal = () => {
        modal.classList.add('closing');
        setTimeout(() => {
            modal.close();
            modal.classList.remove('closing');
            document.body.style.overflow = 'auto';
        }, 300); // Matches CSS transition duration
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            closeModal();
        }
    });

    // Easter Egg Hobbies Modal
    const easterEggTrigger = document.getElementById('easter-egg-trigger');
    const hobbiesModal = document.getElementById('hobbies-modal');
    const closeHobbiesBtn = document.getElementById('close-hobbies-modal');

    if (easterEggTrigger && hobbiesModal) {
        easterEggTrigger.addEventListener('click', () => {
            hobbiesModal.showModal();
            document.body.style.overflow = 'hidden';
        });

        const closeHobbies = () => {
            hobbiesModal.classList.add('closing');
            setTimeout(() => {
                hobbiesModal.close();
                hobbiesModal.classList.remove('closing');
                document.body.style.overflow = 'auto';
            }, 300);
        };

        closeHobbiesBtn.addEventListener('click', closeHobbies);

        hobbiesModal.addEventListener('click', (e) => {
            const dialogDimensions = hobbiesModal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                closeHobbies();
            }
        });
    }

    // Fix for mailto: links (Copy to clipboard + fallback)
    const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
    mailtoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const email = link.getAttribute('href').replace('mailto:', '');
            
            // Try copying to clipboard as a reliable fallback
            navigator.clipboard.writeText(email).then(() => {
                const originalText = link.textContent;
                link.textContent = 'Email Copied!';
                setTimeout(() => {
                    link.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.log('Clipboard copy failed', err);
            });
        });
    });
});
