// MAGA Ipsum tool

function generateIpsum(paragraphs, intensity) {

    // Verify that terms have been loaded
    if (!terms) {
        console.log("Cannot find terms");
        return false;
    }

    // Create the list of terms
    var termList = new Array();
    if (intensity == 'conservative') {
        termList = terms['conservative'];
    }
    if (intensity == 'maga') {
        termList = termList.concat(terms['conservative'], terms['maga']);
    }
    if (intensity == 'tinfoil') {
        termList = termList.concat(terms['conservative'], terms['maga'], terms['tinfoil'], terms['tinfoil']);
    }
    if (intensity == 'q') {
        termList = termList.concat(terms['conservative'], terms['maga'], terms['tinfoil'], terms['q'], terms['q']);
    }

    // Create the paragraphs
    var output = "";
    for (var x = 0; x < paragraphs; x++) {
        output = output + "<p>";
        
        // Choose number of sentences
        var numSentences = Math.floor((Math.random() * 3) + 4);
        for (var y = 0; y < numSentences; y++) {

            // Choose length of sentence
            var sentenceLength = Math.floor((Math.random() * 7) + 5);

            // Add that many random words to the sentence
            var words = new Array();
            for (var z = 0; z < sentenceLength; z++) {

                var unique = false;
                while (unique == false) {
                    var termgen = Math.floor(Math.random() * termList.length);
                    var termval = termList[termgen];
                    if (!words.includes(termval)) {
                        unique = true;
                    }
                }
                words.push(termval);
                
            }

            // concatenate into one sentence
            var sentence = words.join(' ') + '. ';

            // Capitalize the first letter of the sentence
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);

            // Add sentence to output
            output = output + sentence;

        }
        
        output = output + "</p>";
    }

    return output;

}

document.addEventListener('DOMContentLoaded', function(event) {

    // Define the submit function
    document.getElementById('ipsumOptions').addEventListener('submit', function(e) {
        
        var paragraphs = document.getElementById('frmParagraphs').value;
        var intensity = document.getElementById('frmIntensity').value;
        var elem = document.getElementById('ipsum-text');
        
        // Generate ipsum text and add to the card
        ipsum = generateIpsum(paragraphs, intensity);
        elem.innerHTML = ipsum;
        
        // Scroll to the beginning of the ipsum
        elem.scrollIntoView({ behavior: 'smooth' });

        e.preventDefault();
    });

});

