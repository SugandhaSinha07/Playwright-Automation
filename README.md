# Playwright Automation Framework (JavaScript)

End-to-end UI and API test automation framework built with **Playwright** and **JavaScript**, using the **Page Object Model**, reusable utilities, fixtures and data-driven tests.

## Tech stack
- Playwright Test (`@playwright/test`)
- JavaScript (Node.js)
- Page Object Model
- Playwright HTML reporter, screenshots and traces
- GitHub Actions (CI workflow)

## What is covered
| Area | Examples |
|------|----------|
| **E2E UI flows** | Login, product search, add to cart, checkout and order verification on a demo e-commerce app |
| **Page Object Model** | `pageObjects/` – LoginPage, DashBoardPage, CheckoutPage, OrderReview, POManager |
| **API testing** | Create orders and get auth tokens through the REST API (`utils/ApiUtils.js`), then validate them in the UI |
| **Network interception** | Mocking API responses and intercepting requests (`NetworkTest*.spec.js`) |
| **Data-driven testing** | Test data from JSON (`utils/placeOrderTestData.json`) and custom fixtures (`utils/test-base.js`) |
| **Event booking app** | Booking, refund and cross-user scenarios on an event-booking demo site |
| **UI handling** | Frames, file upload/download, dropdowns, child windows and visual comparison (screenshot snapshots) |

## Project structure
```
├── pageObjects/        # Page Object classes
├── tests/              # Test specs (UI, API, network, E2E)
├── utils/              # API helpers, fixtures, test data
├── playwright.config.js
└── .github/workflows/  # CI pipeline
```

## How to run
```bash
npm install
npx playwright install

# set your own test-account password (never commit real passwords)
export TEST_PASSWORD="your_test_password"   # Windows: set TEST_PASSWORD=your_test_password

npx playwright test                 # run all tests
npx playwright test tests/ClientAppPO.spec.js --headed   # run one spec in headed mode
npx playwright show-report          # open the HTML report
```

## CI
The GitHub Actions workflow (`.github/workflows/playwright.yml`) installs dependencies and browsers, runs the suite headless, and uploads the HTML report as a build artifact. It is set to run manually (**Actions → Playwright Tests → Run workflow**), with `TEST_PASSWORD` stored as a repository secret.

## Author
**Sugandha Sinha** – QA Automation & Performance Engineer
[LinkedIn](https://www.linkedin.com/in/sugandha-sinha-b158062b)
