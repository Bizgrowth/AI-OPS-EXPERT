// Utility functions for generating and downloading case studies

export interface CaseStudyData {
  serviceTitle: string;
  serviceSubtitle: string;
  coreValue: string;
  applications: Array<{
    title: string;
    problem: string;
    solution: string;
    impact: string;
    features?: string[];
  }>;
  successStories: Array<{
    story: string;
    highlight: string;
  }>;
  methodology: string[];
  deliverables: string[];
}

export const generateCaseStudyPDF = (data: CaseStudyData): string => {
  // Generate HTML content for the case study
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.serviceTitle} - Case Study</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: white;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #06b6d4;
            padding-bottom: 20px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 10px;
        }
        
        .header p {
            font-size: 1.2rem;
            color: #64748b;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 20px;
            border-left: 4px solid #06b6d4;
            padding-left: 15px;
        }
        
        .section h3 {
            font-size: 1.4rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 15px;
            margin-top: 25px;
        }
        
        .section p {
            margin-bottom: 15px;
            color: #4b5563;
            font-size: 1rem;
        }
        
        .application {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
        }
        
        .application h4 {
            font-size: 1.3rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 15px;
        }
        
        .problem, .solution, .impact {
            margin-bottom: 15px;
        }
        
        .problem strong, .solution strong, .impact strong {
            color: #dc2626;
        }
        
        .solution strong {
            color: #059669;
        }
        
        .impact strong {
            color: #7c3aed;
        }
        
        .features {
            margin-top: 15px;
        }
        
        .features ul {
            list-style: none;
            padding-left: 0;
        }
        
        .features li {
            padding: 5px 0;
            padding-left: 20px;
            position: relative;
        }
        
        .features li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #059669;
            font-weight: bold;
        }
        
        .success-story {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
        }
        
        .success-story p {
            color: #166534;
            font-style: italic;
        }
        
        .methodology-list, .deliverables-list {
            list-style: none;
            padding-left: 0;
        }
        
        .methodology-list li, .deliverables-list li {
            padding: 8px 0;
            padding-left: 30px;
            position: relative;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .methodology-list li::before {
            content: counter(step-counter);
            counter-increment: step-counter;
            position: absolute;
            left: 0;
            top: 8px;
            background: #06b6d4;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: bold;
        }
        
        .methodology-list {
            counter-reset: step-counter;
        }
        
        .deliverables-list li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #059669;
            font-weight: bold;
        }
        
        .footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
        }
        
        .footer h3 {
            color: #1e293b;
            margin-bottom: 10px;
        }
        
        @media print {
            body {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .section h2 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${data.serviceTitle}</h1>
        <p>${data.serviceSubtitle}</p>
        <p style="margin-top: 15px; font-size: 1rem; color: #6b7280;">
            Comprehensive Case Study & Implementation Guide
        </p>
    </div>

    <div class="section">
        <h2>Executive Summary</h2>
        <p>${data.coreValue}</p>
    </div>

    <div class="section">
        <h2>Featured AI Solutions</h2>
        ${data.applications.map(app => `
            <div class="application">
                <h4>${app.title}</h4>
                <div class="problem">
                    <strong>Business Challenge:</strong> ${app.problem}
                </div>
                <div class="solution">
                    <strong>AI Solution:</strong> ${app.solution}
                </div>
                <div class="impact">
                    <strong>Measurable Impact:</strong> ${app.impact}
                </div>
                ${app.features ? `
                    <div class="features">
                        <strong>Key Features:</strong>
                        <ul>
                            ${app.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2>Client Success Stories</h2>
        ${data.successStories.map(story => `
            <div class="success-story">
                <p>"${story.story}"</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2>Implementation Methodology</h2>
        <ol class="methodology-list">
            ${data.methodology.map(step => `<li>${step}</li>`).join('')}
        </ol>
    </div>

    <div class="section">
        <h2>What You Receive</h2>
        <ul class="deliverables-list">
            ${data.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
        </ul>
    </div>

    <div class="footer">
        <h3>Ready to Get Started?</h3>
        <p>Contact Daniel Schley, AI Operations Expert</p>
        <p>Email: dschley@aiopsexpert.com | Phone: 904-955-3905</p>
        <p style="margin-top: 15px; font-size: 0.9rem;">
            This case study demonstrates proven AI implementation strategies and measurable business results.
            <br>All client results are based on actual implementations and verified outcomes.
        </p>
    </div>
</body>
</html>`;

  return htmlContent;
};

export const downloadCaseStudy = (data: CaseStudyData): void => {
  try {
    // Generate the HTML content
    const htmlContent = generateCaseStudyPDF(data);
    
    // Create a blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.serviceTitle.replace(/\s+/g, '_')}_Case_Study.html`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Show success message
    console.log(`Case study for ${data.serviceTitle} downloaded successfully!`);
  } catch (error) {
    console.error('Error downloading case study:', error);
    alert('There was an error downloading the case study. Please try again.');
  }
};

export const generateComprehensivePortfolio = (): void => {
  const portfolioContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daniel Schley - Complete AI Solutions Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: white;
        }
        
        .cover {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            padding: 80px 40px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .cover h1 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #06b6d4, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .cover h2 {
            font-size: 1.8rem;
            margin-bottom: 30px;
            color: #94a3b8;
        }
        
        .cover p {
            font-size: 1.2rem;
            max-width: 800px;
            margin: 0 auto 40px;
            color: #cbd5e1;
        }
        
        .stats {
            display: flex;
            justify-content: center;
            gap: 60px;
            margin-top: 40px;
            flex-wrap: wrap;
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 700;
            color: #06b6d4;
        }
        
        .stat-label {
            font-size: 1rem;
            color: #94a3b8;
        }
        
        .content {
            max-width: 1000px;
            margin: 0 auto;
            padding: 60px 40px;
        }
        
        .section {
            margin-bottom: 60px;
            page-break-inside: avoid;
        }
        
        .section h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .section h3 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 20px;
            border-left: 4px solid #06b6d4;
            padding-left: 20px;
        }
        
        .service-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .service-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 30px;
            transition: transform 0.2s;
        }
        
        .service-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .service-card h4 {
            font-size: 1.4rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 15px;
        }
        
        .service-card p {
            color: #4b5563;
            margin-bottom: 20px;
        }
        
        .roi-highlight {
            background: #ecfdf5;
            border: 1px solid #bbf7d0;
            border-radius: 8px;
            padding: 15px;
            color: #166534;
            font-weight: 600;
        }
        
        .testimonial {
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            font-style: italic;
            color: #0c4a6e;
        }
        
        .testimonial-author {
            font-weight: 600;
            margin-top: 15px;
            font-style: normal;
        }
        
        @media print {
            .cover {
                page-break-after: always;
            }
            
            .section {
                page-break-inside: avoid;
            }
        }
        
        @media (max-width: 768px) {
            .cover h1 {
                font-size: 2.5rem;
            }
            
            .stats {
                gap: 30px;
            }
            
            .service-grid {
                grid-template-columns: 1fr;
            }
            
            .content {
                padding: 40px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="cover">
        <h1>AI Solutions Portfolio</h1>
        <h2>Daniel Schley - AI Operations Expert</h2>
        <p>
            Comprehensive guide to transforming business operations through intelligent AI implementation. 
            Featuring proven strategies, real client results, and actionable frameworks for sustainable growth.
        </p>
        <div class="stats">
            <div class="stat">
                <div class="stat-number">20+</div>
                <div class="stat-label">Years Operations Experience</div>
            </div>
            <div class="stat">
                <div class="stat-number">100+</div>
                <div class="stat-label">AI Implementations</div>
            </div>
            <div class="stat">
                <div class="stat-number">$50M+</div>
                <div class="stat-label">Client Value Generated</div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="section">
            <h2>Executive Summary</h2>
            <p style="font-size: 1.1rem; color: #374151; margin-bottom: 20px;">
                This comprehensive portfolio showcases 8 core AI solution areas that have consistently delivered 
                measurable results for businesses across industries. Each solution combines 20+ years of operational 
                expertise with cutting-edge AI technology to solve real business challenges.
            </p>
            
            <div class="testimonial">
                "Daniel's AI operations transformation was incredible. We automated 70% of our manual processes 
                and saw a 60% increase in operational efficiency within 4 months. His AI solutions are game-changing."
                <div class="testimonial-author">- Sarah Chen, CEO, TechFlow SaaS</div>
            </div>
        </div>

        <div class="section">
            <h2>Core AI Solution Areas</h2>
            
            <div class="service-grid">
                <div class="service-card">
                    <h4>1. AI Strategy & Implementation</h4>
                    <p>Comprehensive AI roadmaps and strategic implementation plans tailored to your business objectives and operational requirements.</p>
                    <div class="roi-highlight">ROI: 300-500% within 12 months</div>
                </div>
                
                <div class="service-card">
                    <h4>2. AI-Powered Workflow Optimization</h4>
                    <p>Intelligent automation solutions that eliminate bottlenecks and maximize efficiency across all business processes.</p>
                    <div class="roi-highlight">ROI: 40% efficiency improvement, 25 hours saved weekly</div>
                </div>
                
                <div class="service-card">
                    <h4>3. Intelligent Process Automation</h4>
                    <p>AI-driven automation systems that handle complex decision-making and workflows with minimal human intervention.</p>
                    <div class="roi-highlight">ROI: 80% task automation, 90% error reduction</div>
                </div>
                
                <div class="service-card">
                    <h4>4. AI Analytics & Insights</h4>
                    <p>Advanced AI analytics platforms that provide actionable business intelligence and predictive insights.</p>
                    <div class="roi-highlight">ROI: 85% forecast accuracy, 60% faster decisions</div>
                </div>
                
                <div class="service-card">
                    <h4>5. AI Customer Experience Systems</h4>
                    <p>Intelligent customer service and engagement solutions powered by natural language processing and machine learning.</p>
                    <div class="roi-highlight">ROI: 80% automated inquiries, 92% satisfaction</div>
                </div>
                
                <div class="service-card">
                    <h4>6. AI-Enhanced Web Solutions</h4>
                    <p>Intelligent websites and applications with built-in AI capabilities for personalization and optimization.</p>
                    <div class="roi-highlight">ROI: 120% sales increase, 70% content efficiency</div>
                </div>
                
                <div class="service-card">
                    <h4>7. Custom AI Solution Development</h4>
                    <p>Bespoke AI applications and tools designed specifically for your unique business needs and challenges.</p>
                    <div class="roi-highlight">ROI: 90% better performance than generic solutions</div>
                </div>
                
                <div class="service-card">
                    <h4>8. AI Performance Optimization</h4>
                    <p>Continuous optimization of AI systems for maximum ROI and sustained operational impact.</p>
                    <div class="roi-highlight">ROI: 40% accuracy improvement, 60% cost reduction</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Proven Results</h2>
            
            <h3>Financial Impact</h3>
            <ul style="list-style: none; padding: 0;">
                <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong>$2.3M</strong> - Untapped revenue opportunities identified for manufacturing company
                </li>
                <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong>$3.2M</strong> - Additional revenue generated through AI-enhanced e-commerce platform
                </li>
                <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong>$2.1M</strong> - Revenue increase from optimized recommendation engine
                </li>
                <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong>$1.8M</strong> - Additional profit from predictive analytics implementation
                </li>
                <li style="padding: 10px 0;">
                    <strong>$1.3M</strong> - Inventory cost reduction through supply chain optimization
                </li>
            </ul>
            
            <h3>Operational Improvements</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
                <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: #06b6d4;">70%</div>
                    <div>Process Automation</div>
                </div>
                <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: #8b5cf6;">90%</div>
                    <div>Error Reduction</div>
                </div>
                <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: #10b981;">60%</div>
                    <div>Efficiency Increase</div>
                </div>
                <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 8px;">
                    <div style="font-size: 2rem; font-weight: 700; color: #f59e0b;">35+</div>
                    <div>Hours Saved Weekly</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Implementation Framework</h2>
            
            <h3>Phase 1: Discovery & Strategy (Weeks 1-2)</h3>
            <ul style="margin-left: 20px; margin-bottom: 20px;">
                <li>Comprehensive business analysis and AI readiness assessment</li>
                <li>Identification of high-impact automation opportunities</li>
                <li>Custom AI strategy development and roadmap creation</li>
                <li>ROI projections and success metrics definition</li>
            </ul>
            
            <h3>Phase 2: Development & Integration (Weeks 3-8)</h3>
            <ul style="margin-left: 20px; margin-bottom: 20px;">
                <li>Custom AI solution development and testing</li>
                <li>System integration and data pipeline setup</li>
                <li>User interface design and optimization</li>
                <li>Security implementation and compliance verification</li>
            </ul>
            
            <h3>Phase 3: Deployment & Optimization (Weeks 9-12)</h3>
            <ul style="margin-left: 20px; margin-bottom: 20px;">
                <li>Phased rollout and user training</li>
                <li>Performance monitoring and fine-tuning</li>
                <li>Success metrics tracking and reporting</li>
                <li>Continuous improvement and scaling preparation</li>
            </ul>
        </div>

        <div class="section">
            <h2>Next Steps</h2>
            <p style="font-size: 1.1rem; margin-bottom: 30px;">
                Ready to transform your operations with AI? Here's how to get started:
            </p>
            
            <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 30px;">
                <h3 style="color: #0c4a6e; margin-bottom: 20px;">Schedule Your Free AI Strategy Session</h3>
                <p style="margin-bottom: 20px;">
                    Get a personalized AI transformation roadmap for your business. We'll identify your biggest 
                    automation opportunities and create a 90-day implementation plan.
                </p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    <div>
                        <strong>Email:</strong> dschley@aiopsexpert.com<br>
                        <strong>Phone:</strong> 904-955-3905<br>
                        <strong>Response Time:</strong> Within 24 hours
                    </div>
                    <div>
                        <strong>Session Includes:</strong><br>
                        • 60-minute AI assessment<br>
                        • Custom implementation strategy<br>
                        • ROI projections and timeline
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

  try {
    const blob = new Blob([portfolioContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Daniel_Schley_AI_Solutions_Portfolio.html';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Complete AI Solutions Portfolio downloaded successfully!');
  } catch (error) {
    console.error('Error downloading portfolio:', error);
    alert('There was an error downloading the portfolio. Please try again.');
  }
};