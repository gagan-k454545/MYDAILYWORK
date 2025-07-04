-- Insert sample employers
INSERT INTO users (email, password_hash, user_type, first_name, last_name, company_name, phone) VALUES
('employer1@techcorp.com', '$2b$10$example_hash_1', 'employer', 'John', 'Smith', 'TechCorp Solutions', '+1-555-0101'),
('employer2@innovate.com', '$2b$10$example_hash_2', 'employer', 'Sarah', 'Johnson', 'Innovate Labs', '+1-555-0102'),
('employer3@startup.com', '$2b$10$example_hash_3', 'employer', 'Mike', 'Davis', 'StartupXYZ', '+1-555-0103');

-- Insert sample candidates
INSERT INTO users (email, password_hash, user_type, first_name, last_name, phone) VALUES
('candidate1@email.com', '$2b$10$example_hash_4', 'candidate', 'Alice', 'Brown', '+1-555-0201'),
('candidate2@email.com', '$2b$10$example_hash_5', 'candidate', 'Bob', 'Wilson', '+1-555-0202'),
('candidate3@email.com', '$2b$10$example_hash_6', 'candidate', 'Carol', 'Taylor', '+1-555-0203');

-- Insert sample jobs
INSERT INTO jobs (employer_id, title, description, requirements, location, job_type, salary_min, salary_max, company_name, is_featured) VALUES
(1, 'Senior Full Stack Developer', 'We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.', 'Bachelor''s degree in Computer Science or related field. 5+ years of experience with React, Node.js, and databases. Strong problem-solving skills.', 'San Francisco, CA', 'Full-time', 120000, 150000, 'TechCorp Solutions', true),
(1, 'Frontend Developer', 'Join our frontend team to create amazing user experiences. You will work with React, TypeScript, and modern CSS frameworks.', '3+ years of experience with React and TypeScript. Knowledge of CSS frameworks like Tailwind CSS. Experience with responsive design.', 'Remote', 'Full-time', 80000, 100000, 'TechCorp Solutions', false),
(2, 'Data Scientist', 'We are seeking a Data Scientist to help us make data-driven decisions. You will work with large datasets and machine learning models.', 'Master''s degree in Data Science, Statistics, or related field. Experience with Python, SQL, and machine learning frameworks. Strong analytical skills.', 'New York, NY', 'Full-time', 110000, 140000, 'Innovate Labs', true),
(2, 'UX/UI Designer', 'Create intuitive and beautiful user interfaces for our products. You will work closely with our development team.', 'Bachelor''s degree in Design or related field. 3+ years of experience with Figma, Sketch, or similar tools. Portfolio showcasing UI/UX work.', 'Austin, TX', 'Full-time', 70000, 90000, 'Innovate Labs', false),
(3, 'Marketing Manager', 'Lead our marketing efforts and help grow our brand. You will develop marketing strategies and manage campaigns.', 'Bachelor''s degree in Marketing or related field. 5+ years of marketing experience. Experience with digital marketing and social media.', 'Los Angeles, CA', 'Full-time', 75000, 95000, 'StartupXYZ', false),
(3, 'DevOps Engineer', 'Help us scale our infrastructure and improve our deployment processes. You will work with cloud technologies and automation tools.', 'Bachelor''s degree in Computer Science or related field. Experience with AWS, Docker, and Kubernetes. Knowledge of CI/CD pipelines.', 'Seattle, WA', 'Full-time', 100000, 130000, 'StartupXYZ', true);

-- Insert sample candidate profiles
INSERT INTO candidate_profiles (user_id, bio, skills, experience_years, education, linkedin_url) VALUES
(4, 'Passionate full-stack developer with 4 years of experience building web applications. Love working with React and Node.js.', ARRAY['React', 'Node.js', 'JavaScript', 'TypeScript', 'PostgreSQL'], 4, 'Bachelor of Science in Computer Science', 'https://linkedin.com/in/alicebrown'),
(5, 'Frontend developer specializing in React and modern CSS. Enjoy creating beautiful and responsive user interfaces.', ARRAY['React', 'CSS', 'JavaScript', 'Tailwind CSS', 'Figma'], 3, 'Bachelor of Arts in Web Design', 'https://linkedin.com/in/bobwilson'),
(6, 'Data scientist with expertise in machine learning and statistical analysis. Experience with Python and R.', ARRAY['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'], 5, 'Master of Science in Data Science', 'https://linkedin.com/in/caroltaylor');

-- Insert sample applications
INSERT INTO applications (job_id, candidate_id, cover_letter, status) VALUES
(1, 4, 'I am very interested in the Senior Full Stack Developer position. My experience with React and Node.js makes me a great fit for this role.', 'pending'),
(2, 5, 'I would love to join your frontend team. I have extensive experience with React and TypeScript.', 'reviewed'),
(3, 6, 'As a data scientist with 5 years of experience, I am excited about the opportunity to work with your team.', 'pending');
