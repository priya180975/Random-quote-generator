const colors=[
    '#008000',
    '#c5df37',
    '#56a0dd',
    '#c07825',
    '#6e1ba5',
    '#59c9ba',
    '#f1e319',
    '#5ecf97',
    '#cc4fa6',
    '#f32828'
]

let quotesFetch,data,quote,author;
quote=$("#text-cont").text();
author=$("#author").text();

function getquote()
{
    return $.ajax({
        headers:{
            Accept:'application/json'
        },
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') 
            {
                quotesFetch = JSON.parse(jsonQuotes);      
                data=quotesFetch.quotes[Math.floor(Math.random() * quotesFetch.quotes.length)]; 
            }
        }
    });
}

$(document).ready(
    function(){
        $("#new-quote").click(
            function()
            {
                let num=Math.floor(Math.random()*9);
                let colorSelected=colors[num];

                $("#text").css("background",colorSelected);
                $("#author").css("color",colorSelected);
                $("body").css("background",colorSelected+'65');
                
                $.when(getquote()).done(
                    function(){
                    quote=data.quote;
                    author='- '+data.author;
                    $("#text-cont").text(quote);
                    $("#author").text(author);
                    }
                );
            }
        );
        $("#tweet-quote").attr(
            'href',
            'https://twitter.com/intent/tweet?text='+encodeURIComponent('" '+quote+' "'+author)
        );
       
    }
);