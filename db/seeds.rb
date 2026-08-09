# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

Job.find_or_create_by!(title: "Ceiling Fan Repair") do |j|
  j.category = "electrical"
  j.description = "The fan in the living room is making a clicking sound and not spinning at full speed."
  j.address = "Satchiyapuram, Sivakasi, Virudhunagar, Tamil Nadu, 626124, India"
  j.latitude = 9.456200
  j.longitude = 77.798400
  j.mobile_number = "9876543210"
  j.status = "pending"
end

Job.find_or_create_by!(title: "Leaking Kitchen Sink Pipe") do |j|
  j.category = "plumbing"
  j.description = "Water is dripping from the joint below the kitchen sink. Needs immediate repair."
  j.address = "Velayutham Road, Sivakasi, Virudhunagar, Tamil Nadu, 626123, India"
  j.latitude = 9.453200
  j.longitude = 77.802400
  j.mobile_number = "9876543210"
  j.status = "accepted"
end
