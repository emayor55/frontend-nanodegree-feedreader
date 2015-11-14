/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against application.
 */

/* Place all tests within the $() function,
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        /* check allFeeds variable has been defined and that 
         * it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* loop through each feed in the allFeeds object 
         * and ensures it has a URL defined and is not empty.
         */
        it('all have urls defined', function() {
            allFeeds.forEach( function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        /* loop through each feed in the allFeeds object 
         * and ensures it has a name defined and is not empty.
         */
        it('all have names defined', function() {
            allFeeds.forEach( function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {
        /* test if the menu element is hidden by default.
         */
        it('is hidden by default', function() {
             expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* test if the menu changes visibility when the menu ICON 
          * is clicked.
          */
        it('changes visibility when menu icon is clicked', function() {
         
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        
        /* ADDITIONAL TEST:
         * test if menu is hidden when a menu ITEM is clicked
         */

        it('is hidden when menu item is clicked', function() {
            // ensure first that menu is NOT hidden. 
            $('body').removeClass('menu-hidden');
            // confirm menu is not hidden.
            expect($('body').hasClass('menu-hidden')).toBe(false); 

            $('.feed-list').find('a').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* ADDITIONAL TEST:
         * confirm that the number of menu items matches the 
         * number of feeds in the allFeeds object.
         */

        it('has all RSS feeds accounted for', function() {
            var noOfFeeds, noOfMenuItems; 
            noOfFeeds = allFeeds.length;
            noOfMenuItems = $('.feed-list').find('a').length;
            expect(noOfFeeds).toBe(noOfMenuItems); 
        });



});
    
    describe('Initial  Entries', function() {

        /* confirms that when the loadFeed function is called and completes
         * its work, there is at least a single .entry element within
         * the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        }); 

        it('are found after loadFeed runs', function(done) {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
            done();
        });

});

    describe('New Feed Selection', function() {
        var content1, content2, title1, title2;

        beforeAll(function(done) {
            loadFeed(0,function() {
                content1 = $('.feed').find('.entry').find('h2').html();
                title1 = $('.header-title').html();
                loadFeed(1,function() {
                    content2 = $('.feed').find('.entry').find('h2').html();
                     title2 = $('.header-title').html();
                    done();
                });
            });
        });

        /* confirm that when a new feed is loaded by the loadFeed function
         * the content actually changes.
         */
        it('changes the contents ', function(done) {
            expect(content1).not.toEqual(content2);
            done();
        });

        /* ADDITIONAL TEST 
         * ensure that when a new feed is loaded the title also changes.
         */
        it('changes the title ', function(done) {
            expect(title1).not.toEqual(title2);
            done();
        });
});

}());
