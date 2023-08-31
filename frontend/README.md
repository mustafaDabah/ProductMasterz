# Omar Hamdy Portfolio

this is portfolio website build with Next.js 13 and Airtable backend 


## Requirements
Node.js

```bash
install Node js 
```

## Running the website 

```python
# clone the website 
git clone https://github.com/mustafaDabah/GamistaWebsite.git

# install dependencies
npm install 

# Add Airtable API Keys configuration to the .env.local 
NEXT_PUBLIC_BASE_ID = ""
NEXT_PUBLIC_API_KEY = ""

# Add the API Keys that responsible for send messages.
NEXT_PUBLIC_MESSAGE_EMAIL = 
NEXT_PUBLIC_MESSAGE_PASSWORD =

# run development mode 
npm run dev 

# run build mode
npm run build 
```

## What about this website ?
### - Tools
 - Next JS 
 - bootstrab 4 
 - airtable

### - Features
#####   Many of the sections on our website are now dynamically connected to APIs from Airtable, allowing for seamless updates and real-time information.

#### - Airtable API Integration (we can say the all website sections are dynamic)
The following sections are now connected to Airtable APIs:
- Header section.
- About section.
- Skills section.
- Roadmap section.
- projects section.
- testimonial section.
- gallery section.
- newsletters section.
- contect us section.

#### - Contact Us
Our contact form now includes a new feature that allows you to send a message to all team members. Your message will be sent to every member of our team.

#### - Adding HTML Tags to Articles in project . 
- Our API now supports adding HTML tags to articles. This feature allows users to format their articles with HTML tags, providing more flexibility and control over the appearance of their content.

- To use this feature, users can add any valid HTML tag to their article content. For example, the following HTML code can be used to create a section with a heading, paragraph, unordered list, and horizontal line:

```python
 ### you can follow this stucture .  
 - use h3 to add header .
 - use p to write paragraph.
 - use ul to make list with items .
 - use li to add make item list . 
 - use hr to make line. 

### Example
  <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, fugiat.</h3> 
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fac.</p>
  <ul>
    <li>Lorem ipsum dolor sit amet.</li>
    <li>Lorem ipsum dolor sit amet.</li>
    <li>Lorem ipsum dolor sit amet.</li>
    <li>Lorem ipsum dolor sit amet.</li>
  </ul>
  <hr />
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. t ab!</p>
```
Users can add this code to their article content, and the HTML tags will be parsed and rendered in the output.

### - Folder structure
```python
  - src/
   - app/ >>> Contains the main page and layout.
   - assets/
   - Components/ 
     - sections/ >>> contains the sections components in seperate way.
     - UI / >>> contains all public components 
   - Hooks/
   - page / >>> this is file contain the API that responible to send contact us messages.
   - styles/
   - utils/  
