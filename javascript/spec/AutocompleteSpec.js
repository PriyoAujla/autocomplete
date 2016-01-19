describe("Test turning string into character array", function() {
  	var underTest = new WordUtil()

  	it("word 'apple' successfully returns character array", function() {
    	var result = underTest.toCharacterArray('apple');
    	expect(result).toEqual(['a','p','p','l','e'])
  	});
});

describe("Test building a character graph", function() {

  	it("graph is successully expanded with the word 'Car'", function() {
  		var underTest = new CharacterGraphBuilder()
  		underTest.addWord("Car");
    	var result = underTest.getGraph();
    	expect(result).toEqual({'c':{'a':{'r':{"EOW":"car"}}}}); 
  	});

    it("graph is successully expanded with the words car and cat", function() {
      var underTest = new CharacterGraphBuilder()
      underTest.addWord("car");
      underTest.addWord("cat");
      var result = underTest.getGraph();
      expect(result).toEqual({'c':{'a':{'r':{"EOW":"car"},'t':{"EOW":"cat"}}}}); 
    });
});

describe("Test n-gram search", function() {

    var testWordList = ["Black", "Blue", "Red", "Brown", "Car", "Cat", "Cart"];
    var underTest;

    beforeEach(function() {
      underTest = new Search()
      underTest.setup(testWordList);
    });


    it("test 'black', 'blue', 'brown' returned when passing 'b' as search term", function() {
      var result = underTest.search("b")
      expect(result.length).toEqual(3); 
      expect(result).toEqual(["black", "blue","brown"]);
    });

    it("test 'black', 'blue' returned when passing 'bl' as search term", function() {
      var result = underTest.search("bl")
      expect(result.length).toEqual(2); 
      expect(result).toEqual(["black", "blue"]);
    });

    it("test 'brown' returned when passing 'br' as search term", function() {
      var result = underTest.search("br")
      expect(result.length).toEqual(1); 
      expect(result).toEqual(["brown"]);
    });

    it("test 'car', 'cat', 'cart' returned when passing 'ca' as search term", function() {
      var result = underTest.search("ca")
      expect(result.length).toEqual(3); 
      expect(result).toEqual(["car", "cart", "cat"]);
    });

    it("test 'red' returned when passing 'r' as search term", function() {
      var result = underTest.search("r")
      expect(result.length).toEqual(1); 
      expect(result).toEqual(["red"]);
    });

    it("test 'red' returned when passing 'red' as search term", function() {
      var result = underTest.search("red")
      expect(result.length).toEqual(1); 
      expect(result).toEqual(["red"]);
    });

    it("test empty result returned when passing 'x' as search term", function() {
      var result = underTest.search("x")
      expect(result.length).toEqual(0); 
      expect(result).toEqual([]);
    });

});