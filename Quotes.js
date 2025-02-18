    var mainBG = document.getElementById('particles-js')
    
    var nextBtn = document.getElementById('nextBtn');
    var voiceBtn = document.getElementById('voiceBtn');
    var shareBtn = document.getElementById('shareBtn');
    var favBtn = document.getElementById('favBtn');
    var trashBtn = document.getElementById('trashBtn');
    var favBackBtn = document.getElementById('favBackBtn');
    var trashBackBtn = document.getElementById('trashBackBtn');
    var likeBtn = document.getElementById('likeBtn');

    var quote = document.getElementById('quote');
    var person = document.getElementById('person');
    var quoteBG = document.getElementById('quoteBG');
    var quoteBox = document.getElementById('quoteBox');
    var textErr = document.getElementById('textErr');

    var favBox = document.getElementById('favBox');

    var trashBox = document.getElementById('trashBox');

    let favoriteQuotes = [];

    const quoteData =
    [
        {text:"“I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.”", author:"― Marilyn Monroe", color:"brown"},
        {text:"“Be yourself; everyone else is already taken.”", author:"― Oscar Wilde", color:"red"},
        {text:"“So many books, so little time.”-", author:"― Frank Zappa", color:"black"},
        {text:"“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”", author:"― Albert Einstein", color:"green"},
        {text:"“A room without books is like a body without a soul.”", author:"― Marcus Tullius Cicero", color:"orange"},
        {text:"“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.”", author:"― Bernard M. Baruch", color:"blue"}
    ]

    quoteBox.style.display='flex',
    quoteBox.style.flexDirection='column',
    quoteBox.style.alignItems='center',
    quoteBox.style.justifyContent='space-around',
    quoteBG.style.position='relative',
    likeBtn.style.position='absolute',
    likeBtn.style.left='1.5%',
    likeBtn.style.top='70%',
    likeBtn.style.zIndex='9999',

    nextBtn.addEventListener('click', next);
    function next()
    {
        let i = Math.floor(Math.random(quoteData.length)*quoteData.length)
        quote.innerText = quoteData[i].text
        person.innerText = quoteData[i].author
        quoteBG.style.backgroundColor = quoteData[i].color 
        quoteBG.style.transition = '0.3s'
        textErr.style.display = 'none'; 
    }
    next()

    voiceBtn.addEventListener('click', voice);

    function voice()
        {
            let speech = new SpeechSynthesisUtterance(quote.innerText + person.innerText);
            speech.lang = 'en-US';
            speechSynthesis.speak(speech);
        }
    shareBtn.addEventListener('click', share);
    function share()
    {
        let shareLink = document.createElement('a');
        shareLink.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote.innerText +'-'+ person.innerText);
        shareLink.click();
        
    }

    trashBtn.addEventListener('click', trash);
    function trash()
        {
            quoteBox.style.display = 'none';
            favBox.style.display = 'none';
            trashBox.style.display = 'block';
            mainBG.style.background = 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)'
            mainBG.style.transition = '0.3s'
        }
    favBtn.addEventListener('click', favbox);
    function favbox()
        {
            quoteBox.style.display = 'none';
            favBox.style.display = 'block';
            trashBox.style.display = 'none';
            mainBG.style.background = 'linear-gradient(0deg, rgb(60, 62, 167) 0%, rgba(1, 171, 223, 0.992) 100%)'
            mainBG.style.transition = '0.3s'
        }

    favBackBtn.addEventListener('click', back)
    function back()
    {
        quoteBox.style.display = 'block';
        favBox.style.display = 'none';
        trashBox.style.display = 'none';
        mainBG.style.background = 'linear-gradient(0deg, rgb(60, 62, 167) 0%, rgba(18, 31, 46, 0.992) 100%)'
        mainBG.style.transition = '0.3s'
    }
    trashBackBtn.addEventListener('click', back)
    function back()
    {
        quoteBox.style.display = 'block';
        favBox.style.display = 'none';
        trashBox.style.display = 'none';
        mainBG.style.background = 'linear-gradient(0deg, rgb(60, 62, 167) 0%, rgba(18, 31, 46, 0.992) 100%)'
        quoteBox.style.display='flex',
        quoteBox.style.flexDirection='column',
        quoteBox.style.alignItems='center',
        quoteBox.style.justifyContent='space-around'
    }

    likeBtn.addEventListener('click', fav);
    function fav()
    {
        let currentQuote = quote.innerText;
        // Check if the quote is already in the favorite quotes array
        if (!favoriteQuotes.includes(currentQuote)) {
        textErr.style.display='none'
        // Add the quote to the array
        favoriteQuotes.push(currentQuote);
        let favLine = document.createElement('div');
        favLine.className = 'favLine';
        let favRemove = document.createElement('div')
        let favSpan = document.createElement('span')
        favSpan.classList.add('material-symbols-outlined')
        favRemove.className = 'remove';
        let favQuote = document.createElement('div');
        favQuote.className = 'favQuote';
        let favText = document.createElement('p');
        let favPerson = document.createElement('h3');
        let favBtn = document.createElement('button');
        

        favText.innerText = quote.innerText;
        favPerson.innerText = person.innerText;
        favSpan.innerText = 'delete_sweep';
        // favBtn.innerText = 'Remove';

        favQuote.appendChild(favText)
        favQuote.appendChild(favPerson)
        favLine.appendChild(favQuote)
        favBtn.appendChild(favSpan)
        favRemove.appendChild(favBtn)
        favLine.appendChild(favRemove)
        favBox.appendChild(favLine)

        } else {
            textErr.style.display='block'
        }
    }

    favBox.addEventListener("click", (event)=>{
        if(event.target.innerText === 'delete_sweep')
        {
            const favLine = event.target.closest(".favLine");
            let quoteText = favLine.querySelector('p').innerText;
            let index = favoriteQuotes.indexOf(quoteText);
            if (index !== -1) {
                favoriteQuotes.splice(index, 1);
            }
            let trashLine = document.createElement('div');
            trashLine.className = 'trashLine';
            let trashRemove = document.createElement('div')
            trashRemove.className = 'remove';
            let trashSpan = document.createElement('span')
            trashSpan.classList.add('material-symbols-outlined')
            let restoreSpan = document.createElement('span')
            restoreSpan.classList.add('material-symbols-outlined')
            let trashQuote = document.createElement('div');
            trashQuote.className = 'trashQuote';
            let trashText = document.createElement('p');
            let trashPerson = document.createElement('h3');
            let trashBtn = document.createElement('button');
            let restorehBtn = document.createElement('button');
                
            trashPerson = favLine.querySelector('h3');
            trashText = favLine.querySelector('p'); 
            trashSpan.innerText = 'delete_forever';
            restoreSpan.innerText ='restore_from_trash';
                
            trashQuote.appendChild(trashText)
            trashQuote.appendChild(trashPerson) 
            trashLine.appendChild(trashQuote)
            trashBtn.appendChild(trashSpan)
            trashRemove.appendChild(trashBtn)
            restorehBtn.appendChild(restoreSpan)
            trashRemove.appendChild(restorehBtn)
            trashLine.appendChild(trashRemove)
            trashBox.appendChild(trashLine) 
            favLine.remove();
        }
    });
    trashBox.addEventListener("click", (event)=>{
        if(event.target.tagName === 'BUTTON' && event.target.innerText === 'delete_forever')
        {
            const trashLine = event.target.parentElement.parentElement;
            trashLine.remove();
        }
        else if(event.target.innerText === 'restore_from_trash')
        {
            const trashLine = event.target.closest(".trashLine");
            let quoteText = trashLine.querySelector('p').innerText;
            favoriteQuotes.push(quoteText);    
            let favLine = document.createElement('div');
            favLine.className = 'favLine';
            let favRemove = document.createElement('div')
            favRemove.className = 'remove';
            let favSpan = document.createElement('span')
            favSpan.classList.add('material-symbols-outlined')
            let favQuote = document.createElement('div');
            favQuote.className = 'favQuote';
            let favText = document.createElement('p');
            let favPerson = document.createElement('h3');
            let favBtn = document.createElement('button');
                
            favPerson = trashLine.querySelector('h3');
            favText = trashLine.querySelector('p');
            favSpan.innerText = 'delete_sweep';
                
            favQuote.appendChild(favText)
            favQuote.appendChild(favPerson) 
            favLine.appendChild(favQuote)
            favBtn.appendChild(favSpan)
            favRemove.appendChild(favBtn)
            favLine.appendChild(favRemove)
            favBox.appendChild(favLine) 

            trashLine.remove();
        }
    });