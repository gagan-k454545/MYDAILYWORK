-- Add more Indian companies and jobs
INSERT INTO users (email, password_hash, user_type, first_name, last_name, company_name, phone) VALUES
('hr@amazon.in', '$2b$10$example_hash_11', 'employer', 'Ravi', 'Krishnan', 'Amazon India', '+91-9876543216'),
('careers@microsoft.in', '$2b$10$example_hash_12', 'employer', 'Meera', 'Nair', 'Microsoft India', '+91-9876543217'),
('jobs@google.co.in', '$2b$10$example_hash_13', 'employer', 'Arjun', 'Kapoor', 'Google India', '+91-9876543218'),
('hiring@accenture.com', '$2b$10$example_hash_14', 'employer', 'Kavitha', 'Rao', 'Accenture', '+91-9876543219'),
('careers@hcl.com', '$2b$10$example_hash_15', 'employer', 'Suresh', 'Babu', 'HCL Technologies', '+91-9876543220'),
('jobs@techmahindra.com', '$2b$10$example_hash_16', 'employer', 'Pooja', 'Desai', 'Tech Mahindra', '+91-9876543221'),
('hr@ola.com', '$2b$10$example_hash_17', 'employer', 'Karthik', 'Reddy', 'Ola Cabs', '+91-9876543222'),
('careers@swiggy.com', '$2b$10$example_hash_18', 'employer', 'Deepika', 'Sharma', 'Swiggy', '+91-9876543223'),
('jobs@byju.com', '$2b$10$example_hash_19', 'employer', 'Rajesh', 'Kumar', 'BYJU''S', '+91-9876543224'),
('hiring@phonepe.com', '$2b$10$example_hash_20', 'employer', 'Anita', 'Singh', 'PhonePe', '+91-9876543225');

-- Add more diverse job postings across different Indian cities
INSERT INTO jobs (employer_id, title, description, requirements, location, job_type, salary_min, salary_max, company_name, is_featured) VALUES
-- Amazon India jobs
(7, 'Software Development Engineer', 'Join Amazon India to build world-class e-commerce solutions. Work on scalable systems that serve millions of customers across India. You will be part of a team that develops innovative features for Amazon.in and other Amazon services.', 'Bachelor''s degree in Computer Science. 2+ years of experience in Java, Python, or C++. Strong problem-solving skills and knowledge of data structures and algorithms. Experience with distributed systems preferred.', 'Bangalore, Karnataka', 'Full-time', 1500000, 2200000, 'Amazon India', true),

(7, 'Product Manager - Prime Video', 'Lead product strategy for Amazon Prime Video in India. Work on content discovery, user engagement, and localization features for the Indian market. Collaborate with content, engineering, and design teams.', 'MBA or equivalent experience. 4+ years in product management, preferably in media/entertainment. Understanding of Indian content landscape. Strong analytical and communication skills.', 'Mumbai, Maharashtra', 'Full-time', 2000000, 3000000, 'Amazon India', true),

-- Microsoft India jobs
(8, 'Cloud Solution Architect', 'Help enterprise customers in India adopt Microsoft Azure cloud solutions. Design and implement cloud architectures, provide technical guidance, and drive digital transformation initiatives.', 'Bachelor''s degree in Engineering. 5+ years of experience with cloud technologies. Azure certifications preferred. Strong presentation and customer-facing skills. Experience with enterprise clients.', 'Hyderabad, Telangana', 'Full-time', 1800000, 2500000, 'Microsoft India', false),

(8, 'Software Engineer - Office 365', 'Develop features for Microsoft Office 365 suite. Work on web applications, mobile apps, and desktop software used by millions of users worldwide. Focus on collaboration and productivity tools.', 'Bachelor''s degree in Computer Science. 3+ years of experience with C#, JavaScript, or TypeScript. Knowledge of web technologies and cloud services. Experience with Agile development.', 'Bangalore, Karnataka', 'Full-time', 1400000, 2000000, 'Microsoft India', false),

-- Google India jobs
(9, 'Site Reliability Engineer', 'Ensure the reliability and performance of Google services in India. Work on monitoring, automation, and infrastructure scaling. Collaborate with development teams to improve system reliability.', 'Bachelor''s degree in Computer Science or related field. 3+ years of experience with Linux, networking, and distributed systems. Knowledge of monitoring tools and automation. On-call experience preferred.', 'Gurgaon, Haryana', 'Full-time', 1600000, 2300000, 'Google India', true),

(9, 'UX Designer - Google Pay', 'Design user experiences for Google Pay in India. Focus on payment flows, financial services, and localization for Indian users. Work closely with product managers and engineers.', 'Bachelor''s degree in Design, HCI, or related field. 4+ years of UX design experience. Portfolio showcasing mobile app design. Understanding of Indian payment ecosystem preferred.', 'Bangalore, Karnataka', 'Full-time', 1500000, 2200000, 'Google India', false),

-- Accenture jobs
(10, 'Technology Consultant', 'Work with clients across various industries to implement digital transformation solutions. Lead technical teams and provide expertise in cloud, AI, and emerging technologies.', 'Bachelor''s degree in Engineering or Technology. 4+ years of consulting experience. Knowledge of cloud platforms and enterprise technologies. Strong client-facing and leadership skills.', 'Mumbai, Maharashtra', 'Full-time', 1200000, 1800000, 'Accenture', false),

-- HCL Technologies jobs
(11, 'Cybersecurity Analyst', 'Protect client systems and data from cyber threats. Monitor security incidents, conduct vulnerability assessments, and implement security solutions for enterprise clients.', 'Bachelor''s degree in Computer Science or Cybersecurity. 3+ years of experience in information security. Knowledge of security tools and frameworks. Security certifications preferred.', 'Chennai, Tamil Nadu', 'Full-time', 1000000, 1500000, 'HCL Technologies', false),

-- Tech Mahindra jobs
(12, 'Digital Marketing Specialist', 'Drive digital marketing initiatives for Tech Mahindra and its clients. Manage social media campaigns, content marketing, and digital advertising across various platforms.', 'Bachelor''s degree in Marketing or related field. 2+ years of digital marketing experience. Knowledge of SEO, SEM, and social media marketing. Experience with marketing automation tools.', 'Pune, Maharashtra', 'Full-time', 800000, 1200000, 'Tech Mahindra', false),

-- Ola Cabs jobs
(13, 'Data Scientist - Mobility', 'Analyze transportation data to improve Ola''s services. Work on demand forecasting, route optimization, and pricing algorithms. Build machine learning models for the mobility platform.', 'Master''s degree in Data Science or related field. 3+ years of experience with Python, R, and machine learning. Experience with big data technologies. Knowledge of transportation/logistics domain preferred.', 'Bangalore, Karnataka', 'Full-time', 1400000, 2000000, 'Ola Cabs', true),

-- Swiggy jobs
(14, 'Backend Engineer - Food Delivery', 'Build and maintain backend systems for Swiggy''s food delivery platform. Work on order management, payment processing, and delivery optimization systems.', 'Bachelor''s degree in Computer Science. 3+ years of backend development experience. Proficiency in Java, Python, or Node.js. Experience with microservices and databases. Knowledge of food delivery domain is a plus.', 'Bangalore, Karnataka', 'Full-time', 1200000, 1800000, 'Swiggy', false),

-- BYJU'S jobs
(15, 'Content Developer - Mathematics', 'Create engaging educational content for BYJU''S learning app. Develop interactive lessons, animations, and assessments for K-12 mathematics curriculum.', 'Master''s degree in Mathematics or Education. 2+ years of experience in content development or teaching. Strong understanding of pedagogy and learning methodologies. Experience with educational technology preferred.', 'Bangalore, Karnataka', 'Full-time', 900000, 1400000, 'BYJU''S', false),

-- PhonePe jobs
(16, 'Product Manager - Fintech', 'Lead product development for PhonePe''s financial services. Work on payment solutions, lending products, and wealth management features for Indian consumers.', 'MBA or equivalent degree. 4+ years of product management experience in fintech. Understanding of Indian financial services landscape. Strong analytical and strategic thinking skills.', 'Bangalore, Karnataka', 'Full-time', 1800000, 2500000, 'PhonePe', true),

-- Additional jobs in different cities
(1, 'Quality Assurance Engineer', 'Ensure the quality of software products through comprehensive testing. Design test cases, perform manual and automated testing, and work closely with development teams.', 'Bachelor''s degree in Computer Science or related field. 2+ years of QA experience. Knowledge of testing tools and methodologies. Experience with automation testing frameworks preferred.', 'Kolkata, West Bengal', 'Full-time', 700000, 1100000, 'Tata Consultancy Services', false),

(4, 'Business Development Manager', 'Drive business growth by identifying new opportunities and building client relationships. Work with enterprise clients to understand their technology needs and propose solutions.', 'MBA in Business or Marketing. 5+ years of business development experience. Strong communication and negotiation skills. Experience in IT services industry preferred.', 'Ahmedabad, Gujarat', 'Full-time', 1300000, 1900000, 'Infosys Limited', false),

(2, 'Mobile App Developer - iOS', 'Develop iOS applications for Flipkart''s e-commerce platform. Work on customer-facing apps, seller tools, and internal applications using Swift and modern iOS technologies.', 'Bachelor''s degree in Computer Science. 3+ years of iOS development experience. Proficiency in Swift and Objective-C. Experience with iOS frameworks and App Store deployment.', 'Delhi, NCR', 'Full-time', 1100000, 1600000, 'Flipkart', false),

(3, 'Operations Manager - Delivery', 'Manage delivery operations for Zomato across multiple cities. Optimize delivery routes, manage delivery partners, and ensure customer satisfaction.', 'Bachelor''s degree in Operations or Management. 4+ years of operations experience, preferably in logistics or delivery. Strong analytical and problem-solving skills. Experience with delivery platforms preferred.', 'Kochi, Kerala', 'Full-time', 1000000, 1500000, 'Zomato', false);
