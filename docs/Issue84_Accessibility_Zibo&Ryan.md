## Accessibility Tests and Results

### This document gives the instructions on how we test all implemented accessibility functions using ARIA and their results.

#### ARIA (Screen Reader) & Navigation

ARIA, a screen reader, is meant to aid those who are visually impaired. <br>
As an assumption, the website is to be opened with Google Chrome, and using the “ChromeVox Classic Extension.” <br>
The user is able to navigate the page by clicking on various sections on the page. <br>
The user can also press the “Tab” key on the keyboard to go through each section of the page from top to bottom. <br>
The screen reader will use speakers connected to the PC to read all contents which are selected.

#### Understandability (Accurately Spoken Descriptions) & Testing

We go through each webpage of the application and test all contents included in each page which ARIA then uses to read out loud using the speakers connected. <br>
The screen reader can read everything including all buttons, input boxes, etc.

##### We also look at the code (where ARIA is used):
E.g. a submit button. <br>
<-- the screen reader will read "submit button" with no context as to what is being submitted and the effects of the submission.<br>
< button name="submit" aria-label="This will submit your answers to the database. Your information will be kept confidential." ><br>
< div id="owner" aria-label="subject"> Subject < /div> < input type="text" aria-labelledby="owner" /><br>
<br>
Also, the red text indicating the error will not be noticeable for blind users. Use aria-live="assertive" to ensure updates to the page are immediately read.


#### Testing result:

All accessibility related functions are effective, and all the relevant code works as intended.