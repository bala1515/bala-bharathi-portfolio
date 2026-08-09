require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home portfolio page" do
    get root_url
    assert_response :success
    assert_select "h1", text: /B. Bala Bharathi/
    assert_select "h2", text: /Ruby on Rails Developer/
  end

  test "should handle contact form submission" do
    post contact_url, params: {
      name: "Alex Customer",
      email: "alex@example.com",
      message: "Hello Bala, I have a Rails opportunity for you!"
    }
    assert_redirected_to root_path(anchor: "contact")
    follow_redirect!
    assert_select "div", text: /Thank you for your message, Alex Customer!/
  end
end
