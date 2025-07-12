export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  preview: string;
}

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Document',
    description: 'Start with a clean slate',
    category: 'Basic',
    content: '<h1>New Document</h1><p>Start writing here...</p>',
    preview: '# New Document\n\nStart writing here...'
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Template for meeting minutes and notes',
    category: 'Business',
    content: `<h1>Meeting Notes</h1>
<p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
<p><strong>Attendees:</strong> </p>
<p><strong>Agenda:</strong></p>
<ul>
  <li>Topic 1</li>
  <li>Topic 2</li>
  <li>Topic 3</li>
</ul>
<h2>Discussion Points</h2>
<p></p>
<h2>Action Items</h2>
<ul class="task-list">
  <li class="task-list-item"><input type="checkbox" disabled> Task 1</li>
  <li class="task-list-item"><input type="checkbox" disabled> Task 2</li>
  <li class="task-list-item"><input type="checkbox" disabled> Task 3</li>
</ul>
<h2>Next Steps</h2>
<p></p>`,
    preview: `# Meeting Notes\n\n**Date:** ${new Date().toLocaleDateString()}\n**Attendees:** \n\n**Agenda:**\n- Topic 1\n- Topic 2\n- Topic 3\n\n## Discussion Points\n\n## Action Items\n- [ ] Task 1\n- [ ] Task 2\n- [ ] Task 3\n\n## Next Steps`
  },
  {
    id: 'blog-post',
    name: 'Blog Post',
    description: 'Template for blog articles and posts',
    category: 'Content',
    content: `<h1>Blog Post Title</h1>
<p><em>Published on ${new Date().toLocaleDateString()}</em></p>
<p><strong>Summary:</strong> A brief description of what this post covers...</p>
<h2>Introduction</h2>
<p>Hook your readers with an engaging introduction...</p>
<h2>Main Content</h2>
<p>Your main content goes here...</p>
<h3>Subsection</h3>
<p>Break down your content into digestible sections...</p>
<blockquote>
<p>"Add relevant quotes or callouts to emphasize key points."</p>
</blockquote>
<h2>Conclusion</h2>
<p>Wrap up your thoughts and provide next steps...</p>
<hr>
<p><em>Tags: tag1, tag2, tag3</em></p>`,
    preview: `# Blog Post Title\n\n*Published on ${new Date().toLocaleDateString()}*\n\n**Summary:** A brief description of what this post covers...\n\n## Introduction\n\nHook your readers with an engaging introduction...\n\n## Main Content\n\nYour main content goes here...\n\n### Subsection\n\nBreak down your content into digestible sections...\n\n> "Add relevant quotes or callouts to emphasize key points."\n\n## Conclusion\n\nWrap up your thoughts and provide next steps...\n\n---\n\n*Tags: tag1, tag2, tag3*`
  },
  {
    id: 'project-readme',
    name: 'Project README',
    description: 'Template for GitHub/project documentation',
    category: 'Development',
    content: `<h1>Project Name</h1>
<p>A brief description of what this project does and who it's for.</p>
<h2>Features</h2>
<ul>
  <li>Feature 1</li>
  <li>Feature 2</li>
  <li>Feature 3</li>
</ul>
<h2>Installation</h2>
<pre><code>npm install project-name</code></pre>
<h2>Usage</h2>
<pre><code>import { ProjectName } from 'project-name';

const example = new ProjectName();
example.doSomething();</code></pre>
<h2>Contributing</h2>
<p>Contributions are welcome! Please feel free to submit a Pull Request.</p>
<h2>License</h2>
<p>This project is licensed under the MIT License.</p>`,
    preview: `# Project Name\n\nA brief description of what this project does and who it's for.\n\n## Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## Installation\n\n\`\`\`bash\nnpm install project-name\n\`\`\`\n\n## Usage\n\n\`\`\`javascript\nimport { ProjectName } from 'project-name';\n\nconst example = new ProjectName();\nexample.doSomething();\n\`\`\`\n\n## Contributing\n\nContributions are welcome! Please feel free to submit a Pull Request.\n\n## License\n\nThis project is licensed under the MIT License.`
  },
  {
    id: 'research-paper',
    name: 'Research Paper',
    description: 'Academic paper template with proper structure',
    category: 'Academic',
    content: `<h1>Research Paper Title</h1>
<p><strong>Author:</strong> Your Name<br>
<strong>Institution:</strong> Your Institution<br>
<strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
<h2>Abstract</h2>
<p>A concise summary of your research, methodology, findings, and conclusions (150-250 words).</p>
<h2>1. Introduction</h2>
<p>Introduce the research problem, provide background, and state your research objectives.</p>
<h2>2. Literature Review</h2>
<p>Review relevant existing research and identify gaps your study addresses.</p>
<h2>3. Methodology</h2>
<p>Describe your research methods, data collection, and analysis techniques.</p>
<h2>4. Results</h2>
<p>Present your findings clearly with appropriate data visualization.</p>
<h2>5. Discussion</h2>
<p>Interpret your results, discuss implications, and acknowledge limitations.</p>
<h2>6. Conclusion</h2>
<p>Summarize key findings and suggest future research directions.</p>
<h2>References</h2>
<ol>
  <li>Reference 1</li>
  <li>Reference 2</li>
  <li>Reference 3</li>
</ol>`,
    preview: `# Research Paper Title\n\n**Author:** Your Name  \n**Institution:** Your Institution  \n**Date:** ${new Date().toLocaleDateString()}\n\n## Abstract\n\nA concise summary of your research, methodology, findings, and conclusions (150-250 words).\n\n## 1. Introduction\n\nIntroduce the research problem, provide background, and state your research objectives.\n\n## 2. Literature Review\n\nReview relevant existing research and identify gaps your study addresses.\n\n## 3. Methodology\n\nDescribe your research methods, data collection, and analysis techniques.\n\n## 4. Results\n\nPresent your findings clearly with appropriate data visualization.\n\n## 5. Discussion\n\nInterpret your results, discuss implications, and acknowledge limitations.\n\n## 6. Conclusion\n\nSummarize key findings and suggest future research directions.\n\n## References\n\n1. Reference 1\n2. Reference 2\n3. Reference 3`
  },
  {
    id: 'product-spec',
    name: 'Product Specification',
    description: 'Template for product requirements and specifications',
    category: 'Business',
    content: `<h1>Product Specification</h1>
<p><strong>Product:</strong> Product Name<br>
<strong>Version:</strong> 1.0<br>
<strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
<h2>Overview</h2>
<p>Brief description of the product and its purpose.</p>
<h2>Target Audience</h2>
<ul>
  <li>Primary users</li>
  <li>Secondary users</li>
  <li>Stakeholders</li>
</ul>
<h2>Functional Requirements</h2>
<h3>Core Features</h3>
<ul>
  <li>Feature 1: Description</li>
  <li>Feature 2: Description</li>
  <li>Feature 3: Description</li>
</ul>
<h3>User Stories</h3>
<ul>
  <li>As a [user type], I want [goal] so that [benefit]</li>
  <li>As a [user type], I want [goal] so that [benefit]</li>
</ul>
<h2>Non-Functional Requirements</h2>
<ul>
  <li><strong>Performance:</strong> Response time requirements</li>
  <li><strong>Security:</strong> Security considerations</li>
  <li><strong>Scalability:</strong> Growth expectations</li>
</ul>
<h2>Technical Specifications</h2>
<p>Technical implementation details, architecture, and constraints.</p>
<h2>Success Metrics</h2>
<ul>
  <li>Metric 1: Target value</li>
  <li>Metric 2: Target value</li>
  <li>Metric 3: Target value</li>
</ul>`,
    preview: `# Product Specification\n\n**Product:** Product Name  \n**Version:** 1.0  \n**Date:** ${new Date().toLocaleDateString()}\n\n## Overview\n\nBrief description of the product and its purpose.\n\n## Target Audience\n\n- Primary users\n- Secondary users\n- Stakeholders\n\n## Functional Requirements\n\n### Core Features\n\n- Feature 1: Description\n- Feature 2: Description\n- Feature 3: Description\n\n### User Stories\n\n- As a [user type], I want [goal] so that [benefit]\n- As a [user type], I want [goal] so that [benefit]\n\n## Non-Functional Requirements\n\n- **Performance:** Response time requirements\n- **Security:** Security considerations\n- **Scalability:** Growth expectations\n\n## Technical Specifications\n\nTechnical implementation details, architecture, and constraints.\n\n## Success Metrics\n\n- Metric 1: Target value\n- Metric 2: Target value\n- Metric 3: Target value`
  }
];

/**
 * Get templates by category
 */
export const getTemplatesByCategory = (category: string): DocumentTemplate[] => {
  return documentTemplates.filter(template => template.category === category);
};

/**
 * Get all template categories
 */
export const getTemplateCategories = (): string[] => {
  return [...new Set(documentTemplates.map(template => template.category))];
};

/**
 * Get template by ID
 */
export const getTemplateById = (id: string): DocumentTemplate | undefined => {
  return documentTemplates.find(template => template.id === id);
};
