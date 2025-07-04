-- Insert Indian employers
INSERT INTO users (email, password_hash, user_type, first_name, last_name, company_name, phone) VALUES
('hr@tcs.com', '$2b$10$example_hash_1', 'employer', 'Rajesh', 'Kumar', 'Tata Consultancy Services', '+91-9876543210'),
('careers@flipkart.com', '$2b$10$example_hash_2', 'employer', 'Priya', 'Sharma', 'Flipkart', '+91-9876543211'),
('jobs@zomato.com', '$2b$10$example_hash_3', 'employer', 'Amit', 'Singh', 'Zomato', '+91-9876543212'),
('hiring@infosys.com', '$2b$10$example_hash_4', 'employer', 'Sunita', 'Patel', 'Infosys Limited', '+91-9876543213'),
('careers@wipro.com', '$2b$10$example_hash_5', 'employer', 'Vikram', 'Gupta', 'Wipro Technologies', '+91-9876543214'),
('jobs@paytm.com', '$2b$10$example_hash_6', 'employer', 'Neha', 'Agarwal', 'Paytm', '+91-9876543215');

-- Insert Indian candidates
INSERT INTO users (email, password_hash, user_type, first_name, last_name, phone) VALUES
('arjun.mehta@gmail.com', '$2b$10$example_hash_7', 'candidate', 'Arjun', 'Mehta', '+91-9876543220'),
('kavya.reddy@gmail.com', '$2b$10$example_hash_8', 'candidate', 'Kavya', 'Reddy', '+91-9876543221'),
('rohit.jain@gmail.com', '$2b$10$example_hash_9', 'candidate', 'Rohit', 'Jain', '+91-9876543222'),
('ananya.iyer@gmail.com', '$2b$10$example_hash_10', 'candidate', 'Ananya', 'Iyer', '+91-9876543223');

-- Insert Indian job postings with Indian companies and locations
INSERT INTO jobs (employer_id, title, description, requirements, location, job_type, salary_min, salary_max, company_name, is_featured) VALUES
(1, 'Senior Software Engineer', 'Join TCS, India''s largest IT services company. Work on cutting-edge projects for global Fortune 500 clients. You''ll be developing enterprise applications using React, Node.js, and cloud technologies. Great opportunity for career growth in a multinational environment.', 'Bachelor''s degree in Computer Science or related field. 5+ years of experience with React, Node.js, and JavaScript. Experience with cloud platforms (AWS/Azure). Strong problem-solving and communication skills. Knowledge of Agile methodologies preferred.', 'Bangalore, Karnataka', 'Full-time', 1200000, 1800000, 'Tata Consultancy Services', true),

(2, 'Frontend Developer', 'Flipkart is looking for talented Frontend Developers to join our e-commerce platform team. Work on India''s leading online marketplace, serving millions of customers daily. You''ll be creating responsive web applications and mobile-first experiences.', '3+ years of experience with React and TypeScript. Strong knowledge of HTML5, CSS3, and JavaScript ES6+. Experience with responsive design and cross-browser compatibility. Knowledge of Redux and modern build tools. Understanding of e-commerce platforms is a plus.', 'Hyderabad, Telangana', 'Full-time', 800000, 1200000, 'Flipkart', true),

(3, 'Data Scientist', 'Join Zomato''s data science team to work on recommendation systems, demand forecasting, and business intelligence. Help shape the future of food delivery in India through data-driven insights and machine learning solutions.', 'Master''s degree in Data Science, Statistics, or related field. 4+ years of experience with Python, SQL, and machine learning frameworks (TensorFlow/PyTorch). Experience with big data tools (Spark, Hadoop). Strong analytical and problem-solving skills. Experience in the food/delivery industry is preferred.', 'Gurgaon, Haryana', 'Full-time', 1500000, 2200000, 'Zomato', true),

(4, 'Java Developer', 'Infosys is hiring Java Developers for our enterprise application development team. Work on large-scale distributed systems and contribute to digital transformation projects for global clients. Excellent opportunity for freshers and experienced professionals.', 'Bachelor''s degree in Computer Science or IT. 2+ years of experience with Java, Spring Framework, and Hibernate. Knowledge of microservices architecture and REST APIs. Experience with databases (MySQL, PostgreSQL). Understanding of DevOps practices is a plus.', 'Pune, Maharashtra', 'Full-time', 600000, 1000000, 'Infosys Limited', false),

(5, 'DevOps Engineer', 'Wipro Technologies is seeking DevOps Engineers to join our cloud infrastructure team. Work with cutting-edge technologies to automate deployment processes and manage scalable cloud infrastructure for enterprise clients.', 'Bachelor''s degree in Computer Science or related field. 3+ years of experience with AWS/Azure cloud platforms. Proficiency in Docker, Kubernetes, and CI/CD pipelines. Experience with Infrastructure as Code (Terraform, CloudFormation). Knowledge of monitoring tools (Prometheus, Grafana).', 'Chennai, Tamil Nadu', 'Full-time', 1000000, 1500000, 'Wipro Technologies', false),

(6, 'Product Manager', 'Paytm is looking for a Product Manager to lead our fintech product initiatives. Drive product strategy for India''s leading digital payments platform. Work closely with engineering, design, and business teams to deliver innovative financial solutions.', 'MBA or equivalent degree preferred. 4+ years of product management experience, preferably in fintech or payments. Strong analytical skills and data-driven decision making. Experience with user research and A/B testing. Understanding of Indian financial services landscape.', 'Noida, Uttar Pradesh', 'Full-time', 1800000, 2500000, 'Paytm', true),

(1, 'Mobile App Developer (Android)', 'TCS is hiring Android developers to work on mobile applications for banking and financial services clients. Develop native Android apps using Kotlin and Java. Work in an agile environment with cross-functional teams.', 'Bachelor''s degree in Computer Science. 3+ years of Android development experience. Proficiency in Kotlin, Java, and Android SDK. Experience with REST APIs and third-party libraries. Knowledge of Material Design principles. Experience with banking/financial apps is preferred.', 'Mumbai, Maharashtra', 'Full-time', 900000, 1400000, 'Tata Consultancy Services', false),

(2, 'UI/UX Designer', 'Flipkart is seeking a UI/UX Designer to create exceptional user experiences for our e-commerce platform. Design intuitive interfaces for web and mobile applications. Collaborate with product managers and developers to bring designs to life.', 'Bachelor''s degree in Design, HCI, or related field. 3+ years of UI/UX design experience. Proficiency in Figma, Sketch, and Adobe Creative Suite. Strong portfolio showcasing mobile and web design work. Understanding of user research methodologies and usability testing.', 'Bangalore, Karnataka', 'Full-time', 800000, 1300000, 'Flipkart', false),

(4, 'Business Analyst', 'Infosys is looking for Business Analysts to work with clients across various industries. Analyze business requirements, document processes, and bridge the gap between business stakeholders and technical teams.', 'Bachelor''s degree in Business, IT, or related field. 2+ years of business analysis experience. Strong analytical and problem-solving skills. Experience with requirement gathering and documentation. Knowledge of business process modeling tools. Excellent communication skills.', 'Hyderabad, Telangana', 'Full-time', 700000, 1100000, 'Infosys Limited', false),

(3, 'Backend Developer (Node.js)', 'Zomato is hiring Backend Developers to work on our food delivery platform''s server-side applications. Build scalable APIs and microservices to handle millions of orders daily across India.', 'Bachelor''s degree in Computer Science. 3+ years of Node.js development experience. Strong knowledge of JavaScript, Express.js, and MongoDB. Experience with microservices architecture and API design. Knowledge of caching strategies and database optimization. Experience with food delivery or e-commerce platforms preferred.', 'Delhi, NCR', 'Full-time', 1100000, 1600000, 'Zomato', false);

-- Insert candidate profiles with Indian context
INSERT INTO candidate_profiles (user_id, bio, skills, experience_years, education, linkedin_url) VALUES
(7, 'Passionate full-stack developer from Bangalore with 4 years of experience in building scalable web applications. Worked with startups and MNCs, specializing in MERN stack development. Love contributing to open-source projects.', ARRAY['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Express.js'], 4, 'Bachelor of Technology in Computer Science - VIT University', 'https://linkedin.com/in/arjunmehta'),

(8, 'Frontend developer from Hyderabad with expertise in creating responsive and user-friendly interfaces. Experience working with e-commerce platforms and fintech applications. Passionate about modern web technologies and design systems.', ARRAY['React', 'TypeScript', 'CSS3', 'Tailwind CSS', 'Redux', 'Figma'], 3, 'Bachelor of Engineering in Information Technology - BITS Pilani', 'https://linkedin.com/in/kavyareddy'),

(9, 'Software engineer from Mumbai with strong backend development skills. Experience in building RESTful APIs and microservices architecture. Worked with both startups and established companies in the fintech sector.', ARRAY['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker', 'Kubernetes'], 5, 'Master of Computer Applications - Mumbai University', 'https://linkedin.com/in/rohitjain'),

(10, 'Data scientist from Chennai with expertise in machine learning and statistical analysis. Experience in building recommendation systems and predictive models for e-commerce and healthcare domains.', ARRAY['Python', 'R', 'TensorFlow', 'SQL', 'Pandas', 'Scikit-learn'], 3, 'Master of Science in Data Science - IIT Madras', 'https://linkedin.com/in/ananyaiyer');

-- Insert sample applications
INSERT INTO applications (job_id, candidate_id, cover_letter, status) VALUES
(1, 7, 'Dear TCS Hiring Team, I am very excited about the Senior Software Engineer position. My 4 years of experience with React and Node.js, combined with my passion for building scalable applications, makes me a perfect fit for this role. I have worked on similar enterprise projects and am familiar with agile methodologies.', 'pending'),

(2, 8, 'Dear Flipkart Team, I am thrilled to apply for the Frontend Developer position. Having worked on e-commerce platforms before, I understand the importance of creating seamless user experiences. My expertise in React and TypeScript aligns perfectly with your requirements.', 'reviewed'),

(3, 10, 'Dear Zomato Data Science Team, As a data scientist with 3 years of experience, I am excited about the opportunity to work on recommendation systems for India''s leading food delivery platform. My experience with machine learning and Python makes me an ideal candidate for this role.', 'pending'),

(4, 9, 'Dear Infosys Hiring Manager, I am interested in the Java Developer position. My 5 years of experience with Java, Spring Framework, and enterprise application development aligns well with your requirements. I am eager to contribute to your digital transformation projects.', 'accepted');
