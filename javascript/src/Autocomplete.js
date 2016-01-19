var autocomplete = (function () {
	
	var my = {};

	/**
	 * @param {string[]} words
	 */
	my.init = function (words) {
		// ...
	};

	return my;
}());

function Search() {

	var graph;

	/**
	* @param {String[]} words - array of words for matching against search terms
	*/
	this.setup = function(words){

		var builder = new CharacterGraphBuilder()
		for(var i = 0; i < words.length; i++) {
			builder.addWord(words[i])
		}

		graph = builder.getGraph();
	}

	this.search = function(word) {
		var results = find(new WordUtil().toCharacterArray(word), graph, []);
		return results;
	}

	function find(characters, node, results){
		if(node != undefined) {
			if(characters.length == 0){
				currentNode = node;
				for (var childNode in currentNode) {
				  if (currentNode.hasOwnProperty(childNode)) {
				  	if(childNode == "EOW"){
				  		results.push(currentNode[childNode])
					} else {
						find([], currentNode[childNode], results);
					}
				  }
				}
				return results
			} else {
				var currentNode = node[characters[0]];

				if(currentNode != undefined) {
					// pass the tail of the character array
					return find(characters.slice(1, characters.length), currentNode, results);
				} else {
					return results;
				}
			}
		}
	}

}

function CharacterGraphBuilder() {

	var graph = {};

	/**
	 * @param {String} word - a word to insert into the graph
	 */
	this.addWord = function(word) {
		var lowerCasedWord = word.toLowerCase()
		var characters = new WordUtil().toCharacterArray(lowerCasedWord);
		var lastGraphNode = graph;
		for(var i = 0; i < characters.length; i++) {
			var currentNode = lastGraphNode;	

			// add child node if it doesn't exist
			if(currentNode[i] === undefined) {
				var lastCharacterInArray = characters.length-1;
				if(i < lastCharacterInArray) {
					// if current graph node doesn't have child node for
					// character, add character as new child node
					if(currentNode[characters[i]] === undefined) {
						currentNode[characters[i]] = {};
					}
				} else {
					currentNode[characters[i]] = {"EOW":lowerCasedWord};
				}
			}

			// new child node is the next node to traverse to
			lastGraphNode = currentNode[characters[i]];
		}
	}

	this.getGraph = function() {
		return graph;
	}
}

function WordUtil() {

	/**
	 * @param {string} word
	 * @return {char[]}
	 */
    this.toCharacterArray = function(word) {
        
        var characters = [];

        for(var i = 0; i < word.length; i++) {
        	characters.push(word.charAt(i));
        }

        return characters;
    };
}