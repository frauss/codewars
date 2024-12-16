import PaginationHelper
import codewars_test as test

@test.describe("Sample tests from description")
def sample_tests():
    collection = ['a', 'b', 'c', 'd', 'e', 'f']
    helper = PaginationHelper(collection, 4)

    @test.it("Test page_count()")
    def _():
        test.assert_equals(helper.page_count(), 2,
                           'page_count is returning incorrect value.')

    @test.it("Test item_count()")
    def _():
        test.assert_equals(helper.item_count(), 6,
                           'item_count returned incorrect value')

    @test.it("Test page_item_count()")
    def _():
        test.assert_equals(helper.page_item_count(
            0),  4, 'page_item_count returned incorrect value for page_index 0')
        test.assert_equals(helper.page_item_count(
            1),  2, 'page_item_count returned incorrect value for page_index 1')
        test.assert_equals(helper.page_item_count(
            2), -1, 'page_item_count returned incorrect value for page_index 2')

    @test.it("Test page_index()")
    def _():
        test.assert_equals(helper.page_index(
            5),  1, 'page_index returned incorrect value for item_index 5')
        test.assert_equals(helper.page_index(
            2),  0, 'page_index returned incorrect value for item_index 2')
        test.assert_equals(helper.page_index(
            20), -1, 'page_index returned incorrect value for item_index 20')
        test.assert_equals(helper.page_index(-10), -1,
                           'page_index returned incorrect value for item_index -10')

    @test.it("Empty list")
    def _():
        empty = PaginationHelper([], 10)
        test.assert_equals(empty.item_count(), 0,
                           "item_count is returning incorrect value")
        test.assert_equals(empty.page_count(), 0,
                           "page_count is returning incorrect value")
        test.assert_equals(empty.page_index(
            0), -1, "page_index(0) called when there was an empty collection")
        test.assert_equals(empty.page_index(
            1), -1, "page_index(1) called when there was an empty collection")
        test.assert_equals(empty.page_index(-1), -1,
                           "page_index(-1) called when there was an empty collection")
        test.assert_equals(empty.page_item_count(
            0), -1, "page_item_count is returning incorrect value for page_index 0")
        test.assert_equals(empty.page_item_count(
            1), -1, "page_item_count is returning incorrect value for page_index 1")
        test.assert_equals(empty.page_item_count(-1), -1, "page_item_count is returning incorrect value for page_index -1")
