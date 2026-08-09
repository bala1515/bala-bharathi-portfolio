class ContactsController < ApplicationController
  def create
    name = params[:name]
    email = params[:email]
    message = params[:message]

    # Log the submission (for ActionMailer or DB storage later)
    Rails.logger.info "[Contact Submission] Name: #{name}, Email: #{email}, Message: #{message}"

    respond_to do |format|
      format.html do
        redirect_to root_path(anchor: "contact"), notice: "Thank you for your message, #{name}! I will get back to you soon."
      end
      format.json do
        render json: { status: "success", message: "Thank you for reaching out!" }
      end
    end
  end
end
