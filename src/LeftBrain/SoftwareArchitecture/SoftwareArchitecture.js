import React from "react";
import "../shared-styles.css";
import "./SoftwareArchitecture.css";

const SoftwareArchitecture = () => {
    const architecturePatterns = [
        {
            name: "VIPER",
            description: "View, Interactor, Presenter, Entity, Router - iOS architecture pattern for clean separation of concerns",
            icon: "🐍",
            complexity: "High",
            testability: "Excellent",
            maintainability: "High",
            bestFor: "Large iOS projects with complex business logic"
        },
        {
            name: "MVC",
            description: "Model-View-Controller - Traditional pattern separating data, presentation, and logic",
            icon: "🏛️",
            complexity: "Low",
            testability: "Medium", 
            maintainability: "Medium",
            bestFor: "Simple to medium applications, rapid prototyping"
        },
        {
            name: "MVP",
            description: "Model-View-Presenter - Presenter handles all UI logic and coordinates between View and Model",
            icon: "🎭",
            complexity: "Medium",
            testability: "Good",
            maintainability: "Good",
            bestFor: "Android development, testable UI logic"
        },
        {
            name: "MVVM",
            description: "Model-View-ViewModel - Two-way data binding between View and ViewModel",
            icon: "🔄",
            complexity: "Medium",
            testability: "Good",
            maintainability: "Good", 
            bestFor: "WPF, Angular, SwiftUI applications"
        },
        {
            name: "Clean Architecture",
            description: "Layered architecture with dependency inversion, focusing on business rules independence",
            icon: "🎯",
            complexity: "High",
            testability: "Excellent",
            maintainability: "Excellent",
            bestFor: "Enterprise applications, long-term projects"
        },
        {
            name: "Redux/Flux",
            description: "Unidirectional data flow pattern for predictable state management",
            icon: "🌊",
            complexity: "Medium",
            testability: "Good",
            maintainability: "Good",
            bestFor: "React applications, complex state management"
        }
    ];

    const viperComponents = [
        {
            name: "View",
            responsibility: "Display UI and receive user input",
            description: "UIViewController, UIView components that handle UI presentation",
            color: "view"
        },
        {
            name: "Interactor",
            responsibility: "Business logic and data manipulation",
            description: "Contains use cases and business rules, independent of UI",
            color: "interactor"
        },
        {
            name: "Presenter",
            responsibility: "Presentation logic and formatting",
            description: "Formats data for display and handles user interactions",
            color: "presenter"
        },
        {
            name: "Entity",
            responsibility: "Data models and business objects",
            description: "Plain data objects representing business entities",
            color: "entity"
        },
        {
            name: "Router",
            responsibility: "Navigation and module creation",
            description: "Handles navigation between modules and creates VIPER components",
            color: "router"
        }
    ];

    const codeExamples = [
        {
            title: "VIPER Architecture - iOS Implementation",
            code: `// MARK: - Protocols
protocol ViewProtocol: AnyObject {
    func showUsers(_ users: [User])
    func showError(_ message: String)
    func showLoading(_ isLoading: Bool)
}

protocol PresenterProtocol: AnyObject {
    func viewDidLoad()
    func didSelectUser(_ user: User)
    func refreshUsers()
}

protocol InteractorProtocol: AnyObject {
    func fetchUsers()
}

protocol RouterProtocol: AnyObject {
    func navigateToUserDetail(_ user: User)
}

// MARK: - Entity
struct User {
    let id: String
    let name: String
    let email: String
    let avatar: String
}

// MARK: - View
class UsersViewController: UIViewController {
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    
    var presenter: PresenterProtocol?
    private var users: [User] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        presenter?.viewDidLoad()
    }
    
    private func setupUI() {
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(UserTableViewCell.self, forCellReuseIdentifier: "UserCell")
        
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action: #selector(refreshData), for: .valueChanged)
        tableView.refreshControl = refreshControl
    }
    
    @objc private func refreshData() {
        presenter?.refreshUsers()
    }
}

extension UsersViewController: ViewProtocol {
    func showUsers(_ users: [User]) {
        DispatchQueue.main.async {
            self.users = users
            self.tableView.reloadData()
            self.tableView.refreshControl?.endRefreshing()
        }
    }
    
    func showError(_ message: String) {
        DispatchQueue.main.async {
            let alert = UIAlertController(title: "Error", message: message, preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default))
            self.present(alert, animated: true)
            self.tableView.refreshControl?.endRefreshing()
        }
    }
    
    func showLoading(_ isLoading: Bool) {
        DispatchQueue.main.async {
            if isLoading {
                self.activityIndicator.startAnimating()
            } else {
                self.activityIndicator.stopAnimating()
            }
        }
    }
}

extension UsersViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return users.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "UserCell", for: indexPath) as! UserTableViewCell
        cell.configure(with: users[indexPath.row])
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        presenter?.didSelectUser(users[indexPath.row])
    }
}

// MARK: - Presenter
class UsersPresenter {
    weak var view: ViewProtocol?
    var interactor: InteractorProtocol?
    var router: RouterProtocol?
    
    init(view: ViewProtocol, interactor: InteractorProtocol, router: RouterProtocol) {
        self.view = view
        self.interactor = interactor
        self.router = router
    }
}

extension UsersPresenter: PresenterProtocol {
    func viewDidLoad() {
        view?.showLoading(true)
        interactor?.fetchUsers()
    }
    
    func didSelectUser(_ user: User) {
        router?.navigateToUserDetail(user)
    }
    
    func refreshUsers() {
        interactor?.fetchUsers()
    }
}

extension UsersPresenter: InteractorOutputProtocol {
    func usersFetchedSuccessfully(_ users: [User]) {
        view?.showLoading(false)
        view?.showUsers(users)
    }
    
    func usersFetchFailed(_ error: Error) {
        view?.showLoading(false)
        view?.showError(error.localizedDescription)
    }
}

// MARK: - Interactor
protocol InteractorOutputProtocol: AnyObject {
    func usersFetchedSuccessfully(_ users: [User])
    func usersFetchFailed(_ error: Error)
}

class UsersInteractor {
    weak var presenter: InteractorOutputProtocol?
    private let apiService: APIServiceProtocol
    
    init(apiService: APIServiceProtocol) {
        self.apiService = apiService
    }
}

extension UsersInteractor: InteractorProtocol {
    func fetchUsers() {
        apiService.fetchUsers { [weak self] result in
            switch result {
            case .success(let users):
                self?.presenter?.usersFetchedSuccessfully(users)
            case .failure(let error):
                self?.presenter?.usersFetchFailed(error)
            }
        }
    }
}

// MARK: - Router
class UsersRouter {
    weak var viewController: UIViewController?
    
    static func createModule() -> UIViewController {
        let view = UsersViewController()
        let apiService = APIService()
        let interactor = UsersInteractor(apiService: apiService)
        let router = UsersRouter()
        let presenter = UsersPresenter(view: view, interactor: interactor, router: router)
        
        view.presenter = presenter
        interactor.presenter = presenter
        router.viewController = view
        
        return view
    }
}

extension UsersRouter: RouterProtocol {
    func navigateToUserDetail(_ user: User) {
        let userDetailVC = UserDetailRouter.createModule(with: user)
        viewController?.navigationController?.pushViewController(userDetailVC, animated: true)
    }
}

// MARK: - API Service
protocol APIServiceProtocol {
    func fetchUsers(completion: @escaping (Result<[User], Error>) -> Void)
}

class APIService: APIServiceProtocol {
    func fetchUsers(completion: @escaping (Result<[User], Error>) -> Void) {
        // Simulate API call
        DispatchQueue.global().asyncAfter(deadline: .now() + 1) {
            let users = [
                User(id: "1", name: "John Doe", email: "john@example.com", avatar: "avatar1"),
                User(id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "avatar2")
            ]
            completion(.success(users))
        }
    }
}`
        },
        {
            title: "MVC Pattern - Classic Implementation",
            code: `// MARK: - Model
class UserModel {
    private var users: [User] = []
    private let apiService = APIService()
    
    func fetchUsers(completion: @escaping ([User]) -> Void) {
        apiService.getUsers { [weak self] result in
            switch result {
            case .success(let users):
                self?.users = users
                completion(users)
            case .failure(let error):
                print("Error fetching users: \\(error)")
                completion([])
            }
        }
    }
    
    func getUser(at index: Int) -> User? {
        guard index < users.count else { return nil }
        return users[index]
    }
    
    func getUsersCount() -> Int {
        return users.count
    }
    
    func addUser(_ user: User) {
        users.append(user)
        // Save to persistence layer
        saveUsers()
    }
    
    private func saveUsers() {
        // Save to Core Data, UserDefaults, etc.
        let encoder = JSONEncoder()
        if let data = try? encoder.encode(users) {
            UserDefaults.standard.set(data, forKey: "users")
        }
    }
    
    private func loadUsers() {
        if let data = UserDefaults.standard.data(forKey: "users"),
           let users = try? JSONDecoder().decode([User].self, from: data) {
            self.users = users
        }
    }
}

// MARK: - View
class UsersViewController: UIViewController {
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var addButton: UIBarButtonItem!
    
    private let userModel = UserModel()
    private var users: [User] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupView()
        loadUsers()
    }
    
    private func setupView() {
        title = "Users"
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "UserCell")
        
        addButton.target = self
        addButton.action = #selector(addButtonTapped)
    }
    
    private func loadUsers() {
        userModel.fetchUsers { [weak self] users in
            DispatchQueue.main.async {
                self?.users = users
                self?.tableView.reloadData()
            }
        }
    }
    
    @objc private func addButtonTapped() {
        showAddUserDialog()
    }
    
    private func showAddUserDialog() {
        let alert = UIAlertController(title: "Add User", message: nil, preferredStyle: .alert)
        
        alert.addTextField { textField in
            textField.placeholder = "Name"
        }
        
        alert.addTextField { textField in
            textField.placeholder = "Email"
            textField.keyboardType = .emailAddress
        }
        
        let addAction = UIAlertAction(title: "Add", style: .default) { [weak self] _ in
            guard let nameField = alert.textFields?[0],
                  let emailField = alert.textFields?[1],
                  let name = nameField.text, !name.isEmpty,
                  let email = emailField.text, !email.isEmpty else { return }
            
            let newUser = User(id: UUID().uuidString, name: name, email: email, avatar: "default")
            self?.addUser(newUser)
        }
        
        alert.addAction(addAction)
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel))
        
        present(alert, animated: true)
    }
    
    private func addUser(_ user: User) {
        userModel.addUser(user)
        users.append(user)
        
        let indexPath = IndexPath(row: users.count - 1, section: 0)
        tableView.insertRows(at: [indexPath], with: .automatic)
    }
}

// MARK: - Controller (TableView Delegate/DataSource)
extension UsersViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return userModel.getUsersCount()
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "UserCell", for: indexPath)
        
        if let user = userModel.getUser(at: indexPath.row) {
            cell.textLabel?.text = user.name
            cell.detailTextLabel?.text = user.email
        }
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        
        if let user = userModel.getUser(at: indexPath.row) {
            navigateToUserDetail(user)
        }
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Handle deletion
            users.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .automatic)
        }
    }
    
    private func navigateToUserDetail(_ user: User) {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        if let detailVC = storyboard.instantiateViewController(withIdentifier: "UserDetailViewController") as? UserDetailViewController {
            detailVC.user = user
            navigationController?.pushViewController(detailVC, animated: true)
        }
    }
}

// MARK: - Swift MVC with Coordinators
class UserCoordinator {
    private let navigationController: UINavigationController
    
    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }
    
    func start() {
        let usersVC = UsersViewController()
        usersVC.coordinator = self
        navigationController.pushViewController(usersVC, animated: false)
    }
    
    func showUserDetail(_ user: User) {
        let detailVC = UserDetailViewController()
        detailVC.user = user
        detailVC.coordinator = self
        navigationController.pushViewController(detailVC, animated: true)
    }
}`
        },
        {
            title: "MVVM Pattern - SwiftUI Implementation",
            code: `import SwiftUI
import Combine

// MARK: - Model
struct User: Identifiable, Codable {
    let id: String
    let name: String
    let email: String
    let avatar: String
    let isActive: Bool
    
    init(id: String = UUID().uuidString, name: String, email: String, avatar: String, isActive: Bool = true) {
        self.id = id
        self.name = name
        self.email = email
        self.avatar = avatar
        self.isActive = isActive
    }
}

// MARK: - Repository/Service
protocol UserRepositoryProtocol {
    func fetchUsers() async throws -> [User]
    func createUser(_ user: User) async throws -> User
    func updateUser(_ user: User) async throws -> User
    func deleteUser(id: String) async throws
}

class UserRepository: UserRepositoryProtocol {
    private let apiService: APIServiceProtocol
    
    init(apiService: APIServiceProtocol = APIService()) {
        self.apiService = apiService
    }
    
    func fetchUsers() async throws -> [User] {
        return try await apiService.fetchUsers()
    }
    
    func createUser(_ user: User) async throws -> User {
        return try await apiService.createUser(user)
    }
    
    func updateUser(_ user: User) async throws -> User {
        return try await apiService.updateUser(user)
    }
    
    func deleteUser(id: String) async throws {
        try await apiService.deleteUser(id: id)
    }
}

// MARK: - ViewModel
@MainActor
class UsersViewModel: ObservableObject {
    @Published var users: [User] = []
    @Published var isLoading = false
    @Published var errorMessage: String?
    @Published var searchText = ""
    @Published var showingAddUser = false
    
    private let userRepository: UserRepositoryProtocol
    private var cancellables = Set<AnyCancellable>()
    
    init(userRepository: UserRepositoryProtocol = UserRepository()) {
        self.userRepository = userRepository
        setupSearchPublisher()
    }
    
    var filteredUsers: [User] {
        if searchText.isEmpty {
            return users
        } else {
            return users.filter { user in
                user.name.localizedCaseInsensitiveContains(searchText) ||
                user.email.localizedCaseInsensitiveContains(searchText)
            }
        }
    }
    
    var activeUsersCount: Int {
        users.filter { $0.isActive }.count
    }
    
    private func setupSearchPublisher() {
        $searchText
            .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
            .removeDuplicates()
            .sink { [weak self] _ in
                self?.objectWillChange.send()
            }
            .store(in: &cancellables)
    }
    
    func loadUsers() async {
        isLoading = true
        errorMessage = nil
        
        do {
            let fetchedUsers = try await userRepository.fetchUsers()
            users = fetchedUsers
        } catch {
            errorMessage = error.localizedDescription
        }
        
        isLoading = false
    }
    
    func addUser(name: String, email: String) async {
        guard !name.isEmpty, !email.isEmpty else {
            errorMessage = "Name and email are required"
            return
        }
        
        let newUser = User(name: name, email: email, avatar: "default")
        
        do {
            let createdUser = try await userRepository.createUser(newUser)
            users.append(createdUser)
            showingAddUser = false
        } catch {
            errorMessage = error.localizedDescription
        }
    }
    
    func deleteUser(at indexSet: IndexSet) async {
        for index in indexSet {
            let user = filteredUsers[index]
            
            do {
                try await userRepository.deleteUser(id: user.id)
                users.removeAll { $0.id == user.id }
            } catch {
                errorMessage = error.localizedDescription
            }
        }
    }
    
    func toggleUserStatus(_ user: User) async {
        let updatedUser = User(
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isActive: !user.isActive
        )
        
        do {
            let result = try await userRepository.updateUser(updatedUser)
            if let index = users.firstIndex(where: { $0.id == user.id }) {
                users[index] = result
            }
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

// MARK: - Views
struct UsersListView: View {
    @StateObject private var viewModel = UsersViewModel()
    
    var body: some View {
        NavigationView {
            VStack {
                if viewModel.isLoading {
                    ProgressView("Loading users...")
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else {
                    usersList
                }
            }
            .navigationTitle("Users (\\(viewModel.activeUsersCount))")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Add User") {
                        viewModel.showingAddUser = true
                    }
                }
            }
            .searchable(text: $viewModel.searchText, prompt: "Search users...")
            .refreshable {
                await viewModel.loadUsers()
            }
            .sheet(isPresented: $viewModel.showingAddUser) {
                AddUserView(viewModel: viewModel)
            }
            .alert("Error", isPresented: .constant(viewModel.errorMessage != nil)) {
                Button("OK") {
                    viewModel.errorMessage = nil
                }
            } message: {
                if let errorMessage = viewModel.errorMessage {
                    Text(errorMessage)
                }
            }
        }
        .task {
            await viewModel.loadUsers()
        }
    }
    
    private var usersList: some View {
        List {
            ForEach(viewModel.filteredUsers) { user in
                NavigationLink(destination: UserDetailView(user: user, viewModel: viewModel)) {
                    UserRowView(user: user, viewModel: viewModel)
                }
            }
            .onDelete { indexSet in
                Task {
                    await viewModel.deleteUser(at: indexSet)
                }
            }
        }
        .listStyle(PlainListStyle())
    }
}

struct UserRowView: View {
    let user: User
    let viewModel: UsersViewModel
    
    var body: some View {
        HStack {
            AsyncImage(url: URL(string: user.avatar)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Circle()
                    .fill(Color.gray.opacity(0.3))
            }
            .frame(width: 50, height: 50)
            .clipShape(Circle())
            
            VStack(alignment: .leading, spacing: 4) {
                Text(user.name)
                    .font(.headline)
                    .foregroundColor(user.isActive ? .primary : .secondary)
                
                Text(user.email)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            if user.isActive {
                Image(systemName: "checkmark.circle.fill")
                    .foregroundColor(.green)
            } else {
                Image(systemName: "pause.circle.fill")
                    .foregroundColor(.orange)
            }
        }
        .onTapGesture {
            Task {
                await viewModel.toggleUserStatus(user)
            }
        }
    }
}

struct AddUserView: View {
    @ObservedObject var viewModel: UsersViewModel
    @State private var name = ""
    @State private var email = ""
    @Environment(\\.dismiss) private var dismiss
    
    var body: some View {
        NavigationView {
            Form {
                Section("User Information") {
                    TextField("Name", text: $name)
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                }
            }
            .navigationTitle("Add User")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Save") {
                        Task {
                            await viewModel.addUser(name: name, email: email)
                        }
                    }
                    .disabled(name.isEmpty || email.isEmpty)
                }
            }
        }
    }
}

struct UserDetailView: View {
    let user: User
    let viewModel: UsersViewModel
    
    var body: some View {
        VStack(spacing: 20) {
            AsyncImage(url: URL(string: user.avatar)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } placeholder: {
                Circle()
                    .fill(Color.gray.opacity(0.3))
            }
            .frame(width: 120, height: 120)
            .clipShape(Circle())
            
            VStack(spacing: 8) {
                Text(user.name)
                    .font(.title)
                    .fontWeight(.bold)
                
                Text(user.email)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                Label(user.isActive ? "Active" : "Inactive", 
                      systemImage: user.isActive ? "checkmark.circle" : "pause.circle")
                    .foregroundColor(user.isActive ? .green : .orange)
            }
            
            Spacer()
        }
        .padding()
        .navigationTitle("User Details")
        .navigationBarTitleDisplayMode(.inline)
    }
}`
        },
        {
            title: "MVP Pattern - Android/Kotlin Style",
            code: `// MARK: - MVP Contracts
protocol UserListContract {
    protocol View: AnyObject {
        func showUsers(_ users: [User])
        func showLoading(_ isLoading: Bool)
        func showError(_ message: String)
        func clearError()
        func navigateToUserDetail(_ user: User)
    }
    
    protocol Presenter: AnyObject {
        func attachView(_ view: View)
        func detachView()
        func loadUsers()
        func refreshUsers()
        func selectUser(_ user: User)
        func deleteUser(_ user: User)
    }
    
    protocol Model: AnyObject {
        func fetchUsers(completion: @escaping (Result<[User], Error>) -> Void)
        func deleteUser(_ user: User, completion: @escaping (Result<Void, Error>) -> Void)
    }
}

// MARK: - Model
class UserListModel: UserListContract.Model {
    private let apiService: APIServiceProtocol
    private let cacheService: CacheServiceProtocol
    
    init(apiService: APIServiceProtocol = APIService(), 
         cacheService: CacheServiceProtocol = CacheService()) {
        self.apiService = apiService
        self.cacheService = cacheService
    }
    
    func fetchUsers(completion: @escaping (Result<[User], Error>) -> Void) {
        // Try cache first
        if let cachedUsers = cacheService.getCachedUsers() {
            completion(.success(cachedUsers))
            return
        }
        
        // Fetch from API
        apiService.fetchUsers { [weak self] result in
            switch result {
            case .success(let users):
                self?.cacheService.cacheUsers(users)
                completion(.success(users))
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
    
    func deleteUser(_ user: User, completion: @escaping (Result<Void, Error>) -> Void) {
        apiService.deleteUser(user.id) { [weak self] result in
            switch result {
            case .success:
                self?.cacheService.removeUser(user)
                completion(.success(()))
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
}

// MARK: - Presenter
class UserListPresenter: UserListContract.Presenter {
    private weak var view: UserListContract.View?
    private let model: UserListContract.Model
    private let router: RouterProtocol
    private var users: [User] = []
    
    init(model: UserListContract.Model, router: RouterProtocol) {
        self.model = model
        self.router = router
    }
    
    func attachView(_ view: UserListContract.View) {
        self.view = view
    }
    
    func detachView() {
        self.view = nil
    }
    
    func loadUsers() {
        view?.showLoading(true)
        view?.clearError()
        
        model.fetchUsers { [weak self] result in
            DispatchQueue.main.async {
                self?.view?.showLoading(false)
                
                switch result {
                case .success(let users):
                    self?.users = users
                    self?.view?.showUsers(users)
                case .failure(let error):
                    self?.view?.showError(error.localizedDescription)
                }
            }
        }
    }
    
    func refreshUsers() {
        // Force refresh from API
        model.fetchUsers { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case .success(let users):
                    self?.users = users
                    self?.view?.showUsers(users)
                case .failure(let error):
                    self?.view?.showError("Failed to refresh: \\(error.localizedDescription)")
                }
            }
        }
    }
    
    func selectUser(_ user: User) {
        view?.navigateToUserDetail(user)
    }
    
    func deleteUser(_ user: User) {
        view?.showLoading(true)
        
        model.deleteUser(user) { [weak self] result in
            DispatchQueue.main.async {
                self?.view?.showLoading(false)
                
                switch result {
                case .success:
                    self?.users.removeAll { $0.id == user.id }
                    self?.view?.showUsers(self?.users ?? [])
                case .failure(let error):
                    self?.view?.showError("Failed to delete user: \\(error.localizedDescription)")
                }
            }
        }
    }
}

// MARK: - View
class UserListViewController: UIViewController {
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    @IBOutlet weak var errorLabel: UILabel!
    @IBOutlet weak var retryButton: UIButton!
    
    private var presenter: UserListContract.Presenter?
    private var users: [User] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupView()
        setupPresenter()
        presenter?.loadUsers()
    }
    
    deinit {
        presenter?.detachView()
    }
    
    private func setupView() {
        title = "Users"
        
        tableView.delegate = self
        tableView.dataSource = self
        tableView.register(UserTableViewCell.self, forCellReuseIdentifier: "UserCell")
        
        let refreshControl = UIRefreshControl()
        refreshControl.addTarget(self, action: #selector(refreshUsers), for: .valueChanged)
        tableView.refreshControl = refreshControl
        
        retryButton.addTarget(self, action: #selector(retryButtonTapped), for: .touchUpInside)
        
        navigationItem.rightBarButtonItem = UIBarButtonItem(
            barButtonSystemItem: .add,
            target: self,
            action: #selector(addButtonTapped)
        )
    }
    
    private func setupPresenter() {
        let model = UserListModel()
        let router = UserListRouter(viewController: self)
        presenter = UserListPresenter(model: model, router: router)
        presenter?.attachView(self)
    }
    
    @objc private func refreshUsers() {
        presenter?.refreshUsers()
    }
    
    @objc private func retryButtonTapped() {
        presenter?.loadUsers()
    }
    
    @objc private func addButtonTapped() {
        // Navigate to add user screen
        let addUserVC = AddUserRouter.createModule()
        let navigationController = UINavigationController(rootViewController: addUserVC)
        present(navigationController, animated: true)
    }
}

// MARK: - View Protocol Implementation
extension UserListViewController: UserListContract.View {
    func showUsers(_ users: [User]) {
        self.users = users
        tableView.reloadData()
        tableView.refreshControl?.endRefreshing()
        
        // Show/hide empty state
        tableView.isHidden = users.isEmpty
        if users.isEmpty {
            showEmptyState()
        }
    }
    
    func showLoading(_ isLoading: Bool) {
        if isLoading {
            activityIndicator.startAnimating()
            errorLabel.isHidden = true
            retryButton.isHidden = true
        } else {
            activityIndicator.stopAnimating()
            tableView.refreshControl?.endRefreshing()
        }
    }
    
    func showError(_ message: String) {
        errorLabel.text = message
        errorLabel.isHidden = false
        retryButton.isHidden = false
        tableView.isHidden = true
    }
    
    func clearError() {
        errorLabel.isHidden = true
        retryButton.isHidden = true
        tableView.isHidden = false
    }
    
    func navigateToUserDetail(_ user: User) {
        let detailVC = UserDetailRouter.createModule(with: user)
        navigationController?.pushViewController(detailVC, animated: true)
    }
    
    private func showEmptyState() {
        let emptyLabel = UILabel()
        emptyLabel.text = "No users found"
        emptyLabel.textAlignment = .center
        emptyLabel.textColor = .systemGray
        emptyLabel.font = .systemFont(ofSize: 18)
        
        tableView.backgroundView = emptyLabel
    }
}

// MARK: - TableView Delegate & DataSource
extension UserListViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return users.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "UserCell", for: indexPath) as! UserTableViewCell
        cell.configure(with: users[indexPath.row])
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        presenter?.selectUser(users[indexPath.row])
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            let user = users[indexPath.row]
            presenter?.deleteUser(user)
        }
    }
}

// MARK: - Router
class UserListRouter: RouterProtocol {
    weak var viewController: UIViewController?
    
    init(viewController: UIViewController) {
        self.viewController = viewController
    }
    
    static func createModule() -> UIViewController {
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let view = storyboard.instantiateViewController(withIdentifier: "UserListViewController") as! UserListViewController
        return view
    }
}`
        }
    ];

    const comparisonData = [
        { pattern: "VIPER", complexity: "High", testability: "Excellent", learning: "Steep", boilerplate: "High", maintainability: "Excellent" },
        { pattern: "MVC", complexity: "Low", testability: "Poor", learning: "Easy", boilerplate: "Low", maintainability: "Poor" },
        { pattern: "MVP", complexity: "Medium", testability: "Good", learning: "Medium", boilerplate: "Medium", maintainability: "Good" },
        { pattern: "MVVM", complexity: "Medium", testability: "Good", learning: "Medium", boilerplate: "Medium", maintainability: "Good" },
        { pattern: "Clean Architecture", complexity: "High", testability: "Excellent", learning: "Steep", boilerplate: "High", maintainability: "Excellent" },
        { pattern: "Redux/Flux", complexity: "Medium", testability: "Good", learning: "Medium", boilerplate: "Medium", maintainability: "Good" }
    ];

    const decisionFactors = [
        {
            question: "Is this a simple app with basic CRUD operations?",
            answer: "Use MVC - Simple and straightforward for basic applications",
            color: "#10B981"
        },
        {
            question: "Do you need high testability and complex business logic?",
            answer: "Use VIPER or Clean Architecture - Excellent separation of concerns",
            color: "#DC2626"
        },
        {
            question: "Are you building a React/Angular application?",
            answer: "Use MVVM or Redux/Flux - Great for component-based frameworks",
            color: "#F59E0B"
        },
        {
            question: "Do you need moderate complexity with good testability?",
            answer: "Use MVP - Good balance between simplicity and testability",
            color: "#3B82F6"
        },
        {
            question: "Are you working with data binding frameworks?",
            answer: "Use MVVM - Excellent for two-way data binding scenarios",
            color: "#8B5CF6"
        }
    ];

    const implementationSteps = [
        {
            step: "1. Define Contracts/Protocols",
            description: "Create interfaces for each layer to ensure loose coupling"
        },
        {
            step: "2. Implement Models/Entities",
            description: "Create data structures and business objects"
        },
        {
            step: "3. Build Business Logic Layer",
            description: "Implement use cases, interactors, or business services"
        },
        {
            step: "4. Create Presentation Layer",
            description: "Build presenters, view models, or controllers"
        },
        {
            step: "5. Implement Views",
            description: "Create UI components that conform to view protocols"
        },
        {
            step: "6. Set Up Navigation/Routing",
            description: "Implement coordinators or routers for navigation flow"
        },
        {
            step: "7. Add Dependency Injection",
            description: "Wire up dependencies and create module factories"
        },
        {
            step: "8. Write Unit Tests",
            description: "Test each layer independently using mocks and stubs"
        }
    ];

    const mobileArchitectures = [
        {
            platform: "iOS",
            preferred: "VIPER, MVVM-C",
            frameworks: "UIKit, SwiftUI",
            patterns: "Coordinator pattern for navigation"
        },
        {
            platform: "Android",
            preferred: "MVP, MVVM",
            frameworks: "Android Architecture Components",
            patterns: "Repository pattern with Room database"
        },
        {
            platform: "React Native",
            preferred: "Redux, Context API",
            frameworks: "React Native, Expo",
            patterns: "Container/Presentational components"
        },
        {
            platform: "Flutter",
            preferred: "BLoC, Provider",
            frameworks: "Flutter framework",
            patterns: "Stream-based state management"
        }
    ];

    const architectureMetrics = [
        { name: "Testability", value: "95%", description: "Easy to unit test" },
        { name: "Maintainability", value: "90%", description: "Easy to modify" },
        { name: "Scalability", value: "88%", description: "Handles growth well" },
        { name: "Performance", value: "85%", description: "Efficient execution" },
        { name: "Learning Curve", value: "70%", description: "Moderate complexity" },
        { name: "Code Reusability", value: "92%", description: "High reuse potential" }
    ];

    const bestPractices = [
        "Keep business logic separate from UI logic",
        "Use dependency injection for loose coupling",
        "Write unit tests for each layer independently",
        "Follow single responsibility principle",
        "Use protocols/interfaces for abstraction",
        "Implement proper error handling",
        "Use coordinators for navigation flow",
        "Keep views dumb and focused on presentation",
        "Make use cases/interactors framework agnostic",
        "Document architecture decisions and patterns"
    ];

    const skills = [
        { name: "VIPER", level: 88 },
        { name: "MVC", level: 95 },
        { name: "MVP", level: 85 },
        { name: "MVVM", level: 90 },
        { name: "Clean Architecture", level: 82 },
        { name: "Coordinator Pattern", level: 87 },
        { name: "Dependency Injection", level: 85 },
        { name: "Unit Testing", level: 88 }
    ];

    return (
        <div className="leftbrain-container software-architecture-section">
            {/* Header Section */}
            <div className="simple-header">
                <h1>Software Architecture Patterns</h1>
                <p>Comprehensive guide to architectural patterns including VIPER, MVC, MVP, MVVM and modern application design</p>
            </div>

            {/* Architecture Patterns Overview */}
            <div className="architecture-patterns-grid">
                {architecturePatterns.map((pattern, index) => (
                    <div key={index} className="architecture-comparison-card">
                        <h4>{pattern.icon} {pattern.name}</h4>
                        <p>{pattern.description}</p>
                        <div style={{ marginTop: '1rem' }}>
                            <div><strong>Complexity:</strong> {pattern.complexity}</div>
                            <div><strong>Testability:</strong> {pattern.testability}</div>
                            <div><strong>Maintainability:</strong> {pattern.maintainability}</div>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <strong>Best for:</strong> {pattern.bestFor}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* VIPER Components Diagram */}
            <div className="viper-diagram">
                <h4>🐍 VIPER Architecture Components</h4>
                <p>Understanding the five components of VIPER and their responsibilities:</p>
                <div className="viper-components">
                    {viperComponents.map((component, index) => (
                        <div key={index} className={`viper-component ${component.color}`}>
                            <h5>{component.name}</h5>
                            <p><strong>{component.responsibility}</strong></p>
                            <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                {component.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MVC Flow Diagram */}
            <div className="mvc-flow-diagram">
                <h4>🏛️ MVC Pattern Flow</h4>
                <div className="mvc-components">
                    <div className="mvc-component">
                        <strong>Model</strong><br/>
                        Data & Business Logic
                    </div>
                    <span className="flow-arrow">↔️</span>
                    <div className="mvc-component">
                        <strong>Controller</strong><br/>
                        Mediates Between View & Model
                    </div>
                    <span className="flow-arrow">↔️</span>
                    <div className="mvc-component">
                        <strong>View</strong><br/>
                        User Interface
                    </div>
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    User interactions flow through Controller to Model, and Model updates are reflected in View
                </p>
            </div>

            {/* Architecture Comparison Table */}
            <div className="architecture-comparison-table">
                <h4>📊 Architecture Pattern Comparison</h4>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Pattern</th>
                            <th>Complexity</th>
                            <th>Testability</th>
                            <th>Learning Curve</th>
                            <th>Boilerplate</th>
                            <th>Maintainability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonData.map((row, index) => (
                            <tr key={index}>
                                <td><strong>{row.pattern}</strong></td>
                                <td>{row.complexity}</td>
                                <td>{row.testability}</td>
                                <td>{row.learning}</td>
                                <td>{row.boilerplate}</td>
                                <td>{row.maintainability}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Code Examples */}
            <div className="section">
                <h2>Architecture Implementation Examples</h2>
                {codeExamples.map((example, index) => (
                    <div key={index} className="software-architecture-code-block">
                        <h4>{example.title}</h4>
                        <pre><code>{example.code}</code></pre>
                    </div>
                ))}
            </div>

            {/* Clean Architecture Layers */}
            <div className="clean-architecture-layers">
                <h4>🎯 Clean Architecture Layers</h4>
                <div className="clean-layers">
                    <div className="clean-layer entities">
                        <strong>Entities (Enterprise Business Rules)</strong><br/>
                        Core business objects and rules
                    </div>
                    <div className="clean-layer use-cases">
                        <strong>Use Cases (Application Business Rules)</strong><br/>
                        Application-specific business rules
                    </div>
                    <div className="clean-layer interface-adapters">
                        <strong>Interface Adapters</strong><br/>
                        Controllers, Presenters, Gateways
                    </div>
                    <div className="clean-layer frameworks">
                        <strong>Frameworks & Drivers</strong><br/>
                        UI, Database, External Services
                    </div>
                </div>
            </div>

            {/* Architecture Decision Tree */}
            <div className="architecture-decision-tree">
                <h4>🤔 Architecture Selection Guide</h4>
                {decisionFactors.map((factor, index) => (
                    <div key={index} className="decision-node">
                        <h6>{factor.question}</h6>
                        <p>{factor.answer}</p>
                    </div>
                ))}
            </div>

            {/* Mobile Platform Architectures */}
            <div className="mobile-architectures">
                <h4>📱 Mobile Platform Architecture Preferences</h4>
                <div className="mobile-platform-grid">
                    {mobileArchitectures.map((platform, index) => (
                        <div key={index} className="mobile-platform-card">
                            <h5>{platform.platform}</h5>
                            <div><strong>Preferred:</strong> {platform.preferred}</div>
                            <div><strong>Frameworks:</strong> {platform.frameworks}</div>
                            <div><strong>Patterns:</strong> {platform.patterns}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Coordinator Pattern */}
            <div className="coordinator-pattern">
                <h4>🧭 Coordinator Pattern for Navigation</h4>
                <p>The Coordinator pattern removes navigation logic from view controllers, making them more focused and testable:</p>
                <ul>
                    <li><strong>Coordinator Protocol:</strong> Defines navigation interface</li>
                    <li><strong>App Coordinator:</strong> Root coordinator managing app flow</li>
                    <li><strong>Feature Coordinators:</strong> Handle specific feature navigation</li>
                    <li><strong>Child Coordinators:</strong> Manage sub-flows and modal presentations</li>
                </ul>
            </div>

            {/* Implementation Timeline */}
            <div className="section">
                <h2>Architecture Implementation Process</h2>
                <div className="implementation-timeline">
                    {implementationSteps.map((step, index) => (
                        <div key={index} className="timeline-step">
                            <h4>{step.step}</h4>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Architecture Quality Metrics */}
            <div className="section">
                <h2>Architecture Quality Metrics</h2>
                <div className="architecture-metrics">
                    {architectureMetrics.map((metric, index) => (
                        <div key={index} className="architecture-metric">
                            <h5>{metric.name}</h5>
                            <span className="metric-value">{metric.value}</span>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {metric.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pros and Cons */}
            <div className="section">
                <h2>VIPER vs MVC - Detailed Comparison</h2>
                <div className="pros-cons-section">
                    <div className="pros-cons-card">
                        <h5>VIPER Architecture</h5>
                        <div className="pros-list">
                            <strong>✅ Pros:</strong>
                            <ul>
                                <li>Excellent separation of concerns</li>
                                <li>Highly testable components</li>
                                <li>Clear responsibility distribution</li>
                                <li>Scalable for large projects</li>
                                <li>Protocol-oriented design</li>
                            </ul>
                        </div>
                        <div className="cons-list">
                            <strong>⚠️ Cons:</strong>
                            <ul>
                                <li>High learning curve</li>
                                <li>Lots of boilerplate code</li>
                                <li>Over-engineering for simple apps</li>
                                <li>More files to manage</li>
                                <li>Initial setup complexity</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="pros-cons-card">
                        <h5>MVC Architecture</h5>
                        <div className="pros-list">
                            <strong>✅ Pros:</strong>
                            <ul>
                                <li>Simple and familiar pattern</li>
                                <li>Low learning curve</li>
                                <li>Quick development</li>
                                <li>Less boilerplate code</li>
                                <li>Good for simple applications</li>
                            </ul>
                        </div>
                        <div className="cons-list">
                            <strong>⚠️ Cons:</strong>
                            <ul>
                                <li>Massive View Controllers</li>
                                <li>Poor testability</li>
                                <li>Tight coupling</li>
                                <li>Hard to maintain at scale</li>
                                <li>Business logic in controllers</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Best Practices */}
            <div className="architecture-best-practices">
                <h4>⭐ Architecture Best Practices</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '0.5rem' }}>
                    {bestPractices.map((practice, index) => (
                        <div key={index} className="best-practice-item">
                            <span className="best-practice-check">✓</span>
                            <span>{practice}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Progress */}
            <div className="section">
                <h2>Architecture Pattern Skills</h2>
                <div className="stats-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="stat-card">
                            <h4>{skill.name}</h4>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{
                                        width: `${skill.level}%`,
                                        background: 'linear-gradient(90deg, #DC2626, #EF4444)',
                                        height: '100%',
                                        borderRadius: 'inherit'
                                    }}
                                ></div>
                            </div>
                            <span>{skill.level}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SoftwareArchitecture;