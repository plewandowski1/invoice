export class InvoicePdfBuilder{

    private firstPart = `
        %PDF-1.3
        %şßŹŕ
        3 0 obj
        <</Type /Page
        /Parent 1 0 R
        /Resources 2 0 R
        /MediaBox [0 0 595.28 841.89]
        /Contents 4 0 R
        >>
        endobj
        4 0 obj
        <</Length 163>>
        stream
        0.57 w
        0 G
    `
    private endOfDocument = `
        0.39 0.39 0.94 rg
        0.39 0.39 0.00 RG
        2.83 w
        141.732 133.229 m 
        283.465 133.229 l
        S
        endstream
        endobj
        1 0 obj
        <</Type /Pages
        /Kids [3 0 R ]
        /Count 1
        >>
        endobj
        5 0 obj
        <<
        /Type /Font
        /BaseFont /Arial
        /Subtype /Type1
        /Encoding /WinAnsiEncoding
        /FirstChar 0
        /LastChar 255
        >>
        endobj


        2 0 obj
        <<
        /ProcSet [/PDF /Text /ImageB /ImageC /ImageI]
        /Font <<
        /F1 5 0 R
        /F2 6 0 R
        /F3 7 0 R
        /F4 8 0 R
        /F5 9 0 R
        /F6 10 0 R
        /F7 11 0 R
        /F8 12 0 R
        /F9 13 0 R
        /F10 14 0 R
        /F11 15 0 R
        /F12 16 0 R
        /F13 17 0 R
        /F14 18 0 R
        >>
        /XObject <<
        >>
        >>
        endobj

        20 0 obj
        <<
        /Type /Catalog
        /Pages 1 0 R
        /OpenAction [3 0 R /FitH null]
        /PageLayout /OneColumn
        >>
        endobj
        xref
        0 21
        0000000000 65535 f 
        0000000336 00000 n 
        0000002153 00000 n 
        0000000015 00000 n 
        0000000124 00000 n 
        0000000393 00000 n 
        0000000518 00000 n 
        0000000648 00000 n 
        0000000781 00000 n 
        0000000918 00000 n 
        0000001041 00000 n 
        0000001170 00000 n 
        0000001302 00000 n 
        0000001438 00000 n 
        0000001566 00000 n 
        0000001693 00000 n 
        0000001822 00000 n 
        0000001955 00000 n 
        0000002057 00000 n 
        0000002401 00000 n 
        0000002487 00000 n 
        trailer
        <<
        /Size 21
        /Root 20 0 R
        /Info 19 0 R
        /ID [ <40EEBBFD1915085334B91FD55106D8D5> <40EEBBFD1915085334B91FD55106D8D5> ]
        >>
        startxref
        2591
        %%EOF
    `
    private content;

    private documentSettings = {
        global: {
            documentWidth: 595.28,
            documentHeight: 841.89,
        },
        number: {
            fontSize: "15",
            positionY: "600",
        },
        creationPlace: {
            header: "Miejsce wystawienia",
            fontSize: "10",
            positionY: "800",
            headerPositionY: "812",
            positionX: "400",
        },
        creationDate: {
            header: "Data wystawienia",
            fontSize: "10",
            headerPositionY: "780",
            positionY: "768",
            positionX: "400",
        },
        sellDate: {
            header: "Data sprzedaży",
            fontSize: "10",
            headerPositionY: "748",
            positionY: "736",
            positionX: "400",
        },
        seller:{
            header: "Sprzedawca",
            fontSize: "10",
            positionY: 700,
            positionX: 50,
        },
        buyer:{
            header: "Nabywca",
            fontSize: "10",
            positionY: 700,
            positionX: 350,
        }
    }

    public addNumber(number){
        var { positionY, fontSize } = this.documentSettings.number;
        var { documentWidth } = this.documentSettings.global;

        var textSize = this.calculateTextSize(number, fontSize + "px");

        var centerPosition = (documentWidth / 2) - (textSize.width / 2);
        var textPart = this.getText(number, {width: centerPosition, height: positionY}, fontSize)

        this.content += textPart;

        return this;
    }

    public addCreationPlace(creationPlace){
        var { positionY, fontSize, header, headerPositionY, positionX } = this.documentSettings.creationPlace;

        var header = this.getText(header, {width: positionX, height: headerPositionY}, fontSize)
        var content = this.getText(creationPlace, {width: positionX, height: positionY}, fontSize)

        this.content += header
        this.content += content

        return this;
    }

    public addCreationDate(creationDate){
        var { positionY, fontSize, header, headerPositionY, positionX } = this.documentSettings.creationDate;

        var header = this.getText(header, {width: positionX, height: headerPositionY}, fontSize)
        var content = this.getText(creationDate, {width: positionX, height: positionY}, fontSize)

        this.content += header
        this.content += content

        return this;
    }

    public addSellDate(sellDate){
        var { positionY, fontSize, header, headerPositionY, positionX } = this.documentSettings.sellDate;

        var header = this.getText(header, {width: positionX, height: headerPositionY}, fontSize)
        var content = this.getText(sellDate, {width: positionX, height: positionY}, fontSize)

        this.content += header
        this.content += content

        return this;
    }

    public addSeller(seller: String[]){
        var { positionY, fontSize, header, positionY, positionX } = this.documentSettings.seller;

        var header = this.getText(header, {width: positionX, height: positionY + ""}, fontSize)
        
        positionY = positionY - 20
        seller.forEach(textLine => {
            var pdfLine = this.getText(textLine, {width: positionX, height: positionY + ""}, fontSize)

            this.content += pdfLine

            positionY = positionY - 12;
        })

        this.content += header

        return this;
    }

    public addBuyer(buyer: String[]){
        var { positionY, fontSize, header, positionY, positionX } = this.documentSettings.buyer;

        var header = this.getText(header, {width: positionX, height: positionY + ""}, fontSize)
        
        positionY = positionY - 20
        buyer.forEach(textLine => {
            var pdfLine = this.getText(textLine, {width: positionX, height: positionY + ""}, fontSize)

            this.content += pdfLine

            positionY = positionY - 12;
        })

        this.content += header

        return this;
    }

    public build(){
        return this.firstPart + this.content + this.endOfDocument;
    }

    private getText(text, position, fontSize){
        var returnValue = 
        `
        BT
        /F1 [%fontSize%] Tf
        [%width%] [%height%] Td
        ([%text%]) Tj
        ET
        `.replace("[%fontSize%]", fontSize)
        .replace("[%width%]", position.width)
        .replace("[%height%]", position.height)
        .replace("[%text%]", text)
    
        return returnValue;
    }

    private calculateTextSize(text, fontSize){
        var test = document.getElementById("Test");

        test.innerHTML = text  
        test.style.fontSize = fontSize
        test.style.position = 'absolute'
        test.style.fontFamily = 'Arial'
        test.style.visibility = 'hidden'
        test.style.height = 'auto'
        test.style.width = 'auto'
        test.style.whiteSpace = 'nowrap'

        var height = test.clientHeight + 1
        var width = test.clientWidth + 1

        return {
            width: width,
            height: height
        }
    }
}