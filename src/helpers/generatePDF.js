import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function generatePDF(data){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `Date: ${day}.${month}.${year}`;
    const schoolYear = `${year}/${year + 1}`;

    const rodString = data["Ime roditelja 1"] + '      ' + data["Ime roditelja 2"];

    let pdfContent = [
        {text: dateString, margin: [2, 10]},
        {
            text: "DEMO ENROLLMENT FORM",
            alignment: 'center',
            bold: true,
            fontSize: 24,
            margin: [2, 15]
        },
        {text: "For students and parents", alignment: 'center', margin: [2, 0, 2, 30]},
        {
            columns: [
                {
                    width: '30%',
                    text: data["Ime i prezime"],
                    decoration: 'underline',
                    alignment: 'center',
                },
                {
                    width: '20%',
                    text: '',
                },
                {
                    width: '50%',
                    text: rodString,
                    decoration: 'underline',
                    alignment: 'center',
                },
            ],
        },
        {
            columns: [
                {
                    width: '30%',
                    text: "(student's name and surname)",
                    alignment: 'center',
                    margin: [10, 10, 10, 20],
                },
                {
                    width: '20%',
                    text: '',
                },
                {
                    width: '50%',
                    text: "(parents' names and surnames)",
                    alignment: 'center',
                    margin: [10, 10, 10, 20],
                },
            ],
        },
    ];

    if (data["Program"] === "Gymnasium program") {
        pdfContent.push(
            {text: 'Selected departments: ', margin: [10, 15, 10, 5]},
            {
                columns: [
                    {
                        width: 50,
                        text: 'First choice:',
                    },
                    {
                        text: data["Prvi izbor"],
                        decoration: 'underline',
                    }
                ],
                margin: [25, 5],
            },
            {
                columns: [
                    {
                        width: 50,
                        text: 'Second choice:',
                    },
                    {
                        text: data["Drugi izbor"],
                        decoration: 'underline',
                    }
                ],
                margin: [25, 5, 25, 20],
            },
        )
    }

    pdfContent.push(
        {
            text: `The student of the first class of high school, as of school year ${schoolYear}, as a mandatory elective subject, chooses:`,
            margin: [10, 20, 10, 10]
        },
    )

    if (data["Vjeronauka ili DKR"] !== "Društvo/kultura/religija") {
        pdfContent.push(
            {text: "Religion classes", bold: true, margin: [25, 5]},
            {text: data["Vjeronauka ili DKR"], margin: [40, 5], decoration: 'underline'},
        )
    } else {
        pdfContent.push(
            {text: "Društvo/kultura/religija", bold: true, margin: [25, 5]},
        )
    }

    pdfContent.push(
        {text: 'Chosen foreign languages:', margin: [10, 15, 10, 5]},
        {
            columns: [
                {
                    width: 100,
                    text: 'First foreign language:',
                },
                {
                    text: data["Prvi strani jezik"] + ' language',
                    decoration: 'underline',
                }
            ],
            margin: [25, 5],
        },
        {
            columns: [
                {
                    width: 100,
                    text: 'Second foreign language:',
                },
                {
                    text: data["Drugi strani jezik"] + ' language',
                    decoration: 'underline',
                }
            ],
            margin: [25, 5],
        },
    );

    pdfContent.push(
        {
            text: `The student of the first class of the Second gymnasium of Sarajevo, as of school year ${schoolYear}, attends the classes of the subject: DSD`,
            margin: [10, 20, 10, 10]
        },
        {text: `${data["DSD"] ? 'YES' : 'NO'}`, alignment: 'center', decoration: 'underline', bold: true}
    )

    pdfContent.push(
        {
            columns: [
                {
                    width: '50%',
                    text: "Student's signature",
                    decoration: 'overline',
                    alignment: 'left',
                },
                {
                    width: '50%',
                    text: "Parent's signature",
                    decoration: 'overline',
                    alignment: 'right',
                },
            ],
            margin: [25, 50, 25, 5],
        },
    )

    pdfMake.createPdf({
        content: pdfContent,
        info: {
            title: 'Enrollment form',
        },
    }).download('Enrollment form.pdf');
}