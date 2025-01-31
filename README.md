
# MG Admin

## Description
MG Admin is a base admin panel for creating other projects. It features two base modules:
1. **Dashboard**: Displays the total number of registered users for the system.
2. **Users**: Allows management of users, roles, and permissions.

## Installation
1. Clone this repository or download the source code.
2. Ensure Python 3.13.0 is installed. You can download it from [here](https://www.python.org/downloads/).
3. Install the required dependencies using pip:
   ```bash
   pip install -r requirements.txt
   ```
4. Make sure to configure the necessary environment variables in a `.env` file (refer to `.env.example` for the required variables).
5. Run the project:
   ```bash
   python index.py
   ```

## Technologies Used
- **Backend**: Python, Flask
- **Frontend**: JavaScript, Bootstrap, CSS
- **Libraries**: Sweet Alert 2, FontAwesome, Chart.js, DataTables.js
- **Database**: Supabase

## Usage
1. Install Python and the required dependencies.
2. In the root directory of the project, run:
   ```bash
   python index.py
   ```
3. The `index.py` file will start the server, and you can access the admin panel via your browser.

## Features
- User CRUD (create, read, update, delete users).
- Role and permission assignment.
- Dashboard views.
- Session management with Flask.

## Contributions
Feel free to contribute or use this project as a base for your own projects. Open an "Issue" or create a "Pull Request" to suggest improvements or add new features.

## License
This project doesn't have a specific license.
