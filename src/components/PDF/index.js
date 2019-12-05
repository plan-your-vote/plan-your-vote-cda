const pdfjs = require('pdfjs');
const logo = require('contents/pdf-logo.jpg')
const check = require('contents/check.jpg')
const fonts = {
    CourierBold: require('pdfjs/font/Courier-Bold.js'),
    CourierBoldOblique: require('pdfjs/font/Courier-BoldOblique.js'),
    CourierOblique: require('pdfjs/font/Courier-Oblique.js'),
    Courier: require('pdfjs/font/Courier.js'),
    HelveticaBold: require('pdfjs/font/Helvetica-Bold.js'),
    HelveticaBoldOblique: require('pdfjs/font/Helvetica-BoldOblique.js'),
    HelveticaOblique: require('pdfjs/font/Helvetica-Oblique.js'),
    Helvetica: require('pdfjs/font/Helvetica.js'),
    Symbol: require('pdfjs/font/Symbol.js'),
    TimesBold: require('pdfjs/font/Times-Bold.js'),
    TimesBoldItalic: require('pdfjs/font/Times-BoldItalic.js'),
    TimesItalic: require('pdfjs/font/Times-Italic.js'),
    TimesRoman: require('pdfjs/font/Times-Roman.js'),
    ZapfDingbats: require('pdfjs/font/ZapfDingbats.js'),
}

// Style objects
const normal_cell = { lineHeight: 2, textAlign: "center" };
const bold_cell = { lineHeight: 2, textAlign: "center", font: fonts.HelveticaBold, fontSize: 13 };
const tableStyle = {
    widths: [null, null, null, null],
    borderVerticalWidths: [0, 5, 5, 5, 0],
    padding: 5
}


function render(data) {
    const fetchArray = [fetch(logo), fetch(check)];// array of Promises for fetching images
    return Promise.all(fetchArray)
        .then(res => Promise.all(res.map(r => r.arrayBuffer())))
        .then(imagesData => {
            const logo = new pdfjs.Image(imagesData[0]);
            const check = new pdfjs.Image(imagesData[1]);
            const first = new pdfjs.Document({ padding: 10 }); // pdf for first page
            const middle = new pdfjs.Document({ padding: 10 }); // pdf for ballot order
            const last = new pdfjs.Document({ padding: 10 }); // pdf for miscelleous questions
            buildFirstPage(first, logo, data);
            buildMiddlePage(middle, check, data);
            return Promise.all([first.asBuffer(), middle.asBuffer()])
                .then(buffers => {
                    last.addPagesOf(new pdfjs.ExternalDocument(buffers[0]));// adds the first page to the pdf
                    last.addPagesOf(new pdfjs.ExternalDocument(buffers[1]));// adds ballot-order pages
                    buildLastPage(last);
                    return last.asBuffer()
                }).then(buf => {
                    const blob = new Blob([buf], { type: 'application/pdf' })
                    return URL.createObjectURL(blob)
                });
        })
}

// This content is hard-coded for now but can be changed in the future
function buildFirstPage(doc, logo, data) {
    const header = doc.header().table({ widths: [null, null], paddingBottom: 1 * pdfjs.cm }).row()
    header.cell().image(logo, { height: 2 * pdfjs.cm })
    header.cell().text({ textAlign: 'left', fontSize: 40 })
        .add('My Summary')


    let cell = doc.cell({ paddingBottom: 0.5 * pdfjs.cm, borderBottomWidth: 1.5 * pdfjs.mm, lineHeight: 2 })
    cell.text('MY VOTING DAY:', { fontSize: 16, font: fonts.HelveticaBold })
    cell.text({ fontSize: 14, lineHeight: 1.35 })
        .add('Voting day:', { fontSize: 13, font: fonts.HelveticaBold })
        .add('    Not Selected', { fontSize: 12 })
    cell.text({ fontSize: 14, lineHeight: 1.35 })
        .add('Location:', { fontSize: 13, font: fonts.HelveticaBold })
        .add('        Not Selected', { fontSize: 12 })
    cell.text({ fontSize: 14, lineHeight: 1.35 })
        .add('Poll Type:', { fontSize: 13, font: fonts.HelveticaBold })
        .add('       Not Selected', { fontSize: 12 })

    cell = doc.cell({ paddingBottom: 0.5 * pdfjs.cm, borderBottomWidth: 1.5 * pdfjs.mm, lineHeight: 2 })
    cell.text('WHAT TO BRING', { fontSize: 16, font: fonts.HelveticaBold })
    cell.text({ lineHeight: 1.35 })
        .add('Are you registered to vote?', { fontSize: 13, font: fonts.HelveticaBold })
    cell.text({ lineHeight: 1.35 })
        .add('Bring the voter information card you recieve in the mail', { fontSize: 12 })
    cell.text({ lineHeight: 1.35 })
        .add('Not registered but a resident of Vancouver?', { fontSize: 13, font: fonts.HelveticaBold })
    cell.text({ lineHeight: 1.35 })
        .add('Bring at least two acceptable documents proving your identity and residence, including at least one document with a signature. ', { fontSize: 12 })
    cell.text({ lineHeight: 1.35 })
        .add('Get more details ', { fontSize: 12 })
        .add('here', {
            link: 'https://www.elections.ca/content.aspx?section=vot&dir=ids&document=index&lang=e',
            underline: true,
            color: 0x569cd6
        });
}

const renderCandidates = (race, candidatesSelected) => {

    return candidatesSelected.map(candidate => {
        if (!candidate) {
            return null;
        }
        if (candidate.candidatePosition === race) {
            return ({
                key: candidate.candidateId,
                candidate
            });
        }
        return null;
    });
};

const candidateCount = (positionName) => {
    const storage = JSON.parse(
        sessionStorage.getItem('selectedCandidateRaces')
    );
    let count = 0;
    if (!storage) {
        return count;
    }
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].candidatePosition === positionName) {
            count += 1;
        }
    }
    return count;
}

const candidatesSummary = (positionName, numberNeeded) => {
    return (`${positionName}: ${candidateCount(positionName)} of ${numberNeeded}`);
}

const mcQ = () => {
    const data = JSON.parse(sessionStorage.getItem('capitalAnswers'));
    if (!data) {
        return null;
    }
    return data.map(mcQuestions => ({
        title: mcQuestions.ballotIssueTitle,
        answer: mcQuestions.ballotIssueAnswer,
        description: mcQuestions.ballotIssueDescription
    }));
};

function addRows(names, selection, table, check) {
    const filteredData = selection.filter(item => !!item).map(item => item.candidate.name);
    const rowCount = Math.ceil(names.length / 4);
    for (let row = 0; row < rowCount; row++) {
        const tr = table.row({ font: fonts.Helvetica, borderBottomWidth: 1.5, });
        const list = [...Array(4)].map((_, index) => names[row + rowCount * index]);
        list.forEach(element => {
            if (filteredData.includes(element)) {
                tr.cell(element, bold_cell).image(check, {});
            } else {
                tr.cell(element, normal_cell);
            }
        });
    }
}

function buildLastPage(doc) {
    const mcqdata = mcQ();
    const header = doc.header().table({ widths: [null], paddingBottom: 1 * pdfjs.cm }).row()
    header.cell().text('MY PLANNED RESPONSES TO CAPITAL PLAN BORROWING QUESTIONS:', { textAlign: 'center', fontSize: 18, font: fonts.HelveticaBold });


    mcqdata.forEach(element => {
        let cell = doc.cell({ paddingTop: 0.5 * pdfjs.cm, paddingBottom: 0.5 * pdfjs.cm, borderBottomWidth: 1.5 * pdfjs.mm, lineHeight: 1 });
        cell.text(element.title, { fontSize: 16, font: fonts.HelveticaBold });
        cell.text({ fontSize: 14, lineHeight: 1.35 })
            .add(element.description, { fontSize: 13, font: fonts.Helvetica })
        cell.text({ fontSize: 14, lineHeight: 1.35 })
            .add(`Your Answer: ${element.answer}`, { fontSize: 13, font: fonts.HelveticaBold })

    })
}

function buildMiddlePage(doc, check, data) {

    const { race: allNames, candidatesSelected } = data;
    allNames.sort((a, b) => (a.ballotOrder - b.ballotOrder))

    const header = doc.header().table({ widths: [null], paddingBottom: 1 * pdfjs.cm }).row()
    header.cell().text({ textAlign: 'center', fontSize: 16, font: fonts.HelveticaBold })
        .add('MY CANDIDATES SORTED BY BALLOT ORDER')


    allNames.forEach((ballot, index, ballots) => {
        const { positionName, numberNeeded } = ballot;
        const candidates = ballot.candidates.map(candidate => candidate.name)
        let cell = doc.cell({ paddingBottom: 0.5 * pdfjs.cm, borderBottomWidth: 1.5 * pdfjs.mm, lineHeight: 2 })
        // cell.text('MY CANDIDATES SORTED BY BALLOT ORDER', { fontSize: 16, font: fonts.HelveticaBold })
        cell.text({ lineHeight: 1.35 })
            .add(candidatesSummary(positionName, numberNeeded), { fontSize: 13, font: fonts.HelveticaBold })
        let table = doc.table(tableStyle)
        addRows(candidates, renderCandidates(positionName, candidatesSelected), table, check);
        if (index !== ballots.length - 1)
            doc.pageBreak()
    });

}


const onButtonClick = function (data) {
    render(data)
        .then(function (url) {
          // Downloading the file 
            const link = document.createElement('a');
            // create a blobURI pointing to our Blob
            link.href = url;
            link.download = "Voting Plan.pdf";
            document.body.append(link);
            link.click();
            link.remove();
        })
}

export default onButtonClick;