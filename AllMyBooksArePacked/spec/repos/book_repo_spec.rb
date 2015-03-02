require 'spec_helper'

describe Chatitude::UsersRepo do

  def User_count
    repo.all(db).count
  end

  let(:repo) { Chatitude::UsersRepo }
  let(:db) { Chatitude.create_db_connection('chatitude_test') }

  before(:each) do
    Chatitude.clear_db(db)
    @User1 = Chatitude::UsersRepo.save(db, { 'username' => "Giovanni", 'password' => 'Swordfish' })['id']
    @User2 = Chatitude::UsersRepo.save(db, { 'username' => "Leonardo", 'password' => 'Swordfish' })['id']
  end

  it "gets all Users" do

    Users = repo.all(db)
    expect(Users).to be_a Array
    expect(Users.count).to eq 2

    usernames = Users.map {|u| u['username'] }
    expect(usernames).to include "Leonardo", "Giovanni"
  end

  xit "creates Users" do
    expect(User_count).to eq 2

    User = repo.save(db, { 'username' => "Brian", 'password' => 'puppyfan102' })
    expect(User['id']).to_not be_nil
    expect(User['username']).to eq "Brian"
    expect(User['password']).to eq "puppyfan102"

    # Check for persistence
    expect(User_count).to eq 3

    User = repo.all(db).first
    expect(User['id']).to_not be_nil
    expect(User['username']).to eq "Giovanni"
    expect(User['password']).to eq "Swordfish"

  end
end
