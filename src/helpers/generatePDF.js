import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function generatePDF(data){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `Datum: ${day}.${month}.${year}. godine`;
    const schoolYear = `${year}/${year + 1}`;

    const rodString = data["Ime roditelja 1"] + '      ' + data["Ime roditelja 2"];

    let pdfContent = [
        {text: dateString, margin: [2, 10]},
        {
            text: "OBAVEZAN ANKETNI LIST ZA UPIS U JU DRUGA GIMNAZIJA SARAJEVO",
            alignment: 'center',
            bold: true,
            fontSize: 24,
            margin: [2, 15]
        },
        {text: "Za učenike i roditelje/staratelje", alignment: 'center', margin: [2, 0, 2, 30]},
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
                    text: '(ime i prezime učenika)',
                    alignment: 'center',
                    margin: [10, 10, 10, 20],
                },
                {
                    width: '20%',
                    text: '',
                },
                {
                    width: '50%',
                    text: '(imena i prezimena roditelja/staratelja)',
                    alignment: 'center',
                    margin: [10, 10, 10, 20],
                },
            ],
        },
    ];

    if (data["Program"] === "Gimnazijski program") {
        pdfContent.push(
            {text: 'Izabrana izborna područja:', margin: [10, 15, 10, 5]},
            {
                columns: [
                    {
                        width: 50,
                        text: '1. izbor:',
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
                        text: '2. izbor:',
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
            text: `Učenik/učenica prvog razreda srednje škole, od školske ${schoolYear}. godine kao izborno-obavezni predmet pohađa nastavni predmet`,
            margin: [10, 20, 10, 10]
        },
    )

    if (data["Vjeronauka ili DKR"] !== "Društvo/kultura/religija") {
        pdfContent.push(
            {text: "Vjeronauka", bold: true, margin: [25, 5]},
            {text: data["Vjeronauka ili DKR"], margin: [40, 5], decoration: 'underline'},
        )
    } else {
        pdfContent.push(
            {text: "Društvo/kultura/religija", bold: true, margin: [25, 5]},
        )
    }

    pdfContent.push(
        {text: 'Izabrani strani jezici:', margin: [10, 15, 10, 5]},
        {
            columns: [
                {
                    width: 100,
                    text: 'Prvi strani jezik:',
                },
                {
                    text: data["Prvi strani jezik"] + ' jezik',
                    decoration: 'underline',
                }
            ],
            margin: [25, 5],
        },
        {
            columns: [
                {
                    width: 100,
                    text: 'Drugi strani jezik:',
                },
                {
                    text: data["Drugi strani jezik"] + ' jezik',
                    decoration: 'underline',
                }
            ],
            margin: [25, 5],
        },
    );

    pdfContent.push(
        {
            text: `Učenik prvog razreda Druge gimnazije Sarajevo, od školske ${schoolYear}. godine pohađa nastavni predmet Intenzivni njemački jezik – DSD`,
            margin: [10, 20, 10, 10]
        },
        {text: `${data["DSD"] ? 'DA' : 'NE'}`, alignment: 'center', decoration: 'underline', bold: true}
    )

    pdfContent.push(
        {
            columns: [
                {
                    width: '50%',
                    text: '(ime i prezime učenika)',
                    decoration: 'overline',
                    alignment: 'left',
                },
                {
                    width: '50%',
                    text: '(ime i roditelja/staratelja)',
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
            title: 'Prijava',
        },
    }).download('prijava.pdf');
}