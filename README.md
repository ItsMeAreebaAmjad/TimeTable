# Auto Timetable Generator

Auto Timetable Generator is a web-based application built using the **MERN stack** with **MySQL** as the database. This system automates the process of generating academic timetables by allowing users to input departments, sessions, and semesters while ensuring that scheduling conflicts are identified and resolved.

## Features

- **Welcome Screen**: Users start from a welcome page.
- **Room & Teacher Viewing**: View available rooms and teachers before scheduling.
- **Create Date Sheet**:
  - Select a department (**Computer Science** or **Software Engineering**).
  - Select a session.
  - Select a semester.
  - These inputs are stored in the database.
- **Timetable Generation**:
  - Displays only courses relevant to the selected semester.
  - Shows available rooms and teachers based on the selected department.
  - Users can enter timetable data manually.
- **Validation & Conflict Detection**:
  - Detects scheduling conflicts, such as:
    - A single room assigned to multiple classes at the same time.
    - A professor scheduled for multiple lectures at the same time.
  - Users must manually resolve conflicts.
- **PDF Export**: Once finalized, the timetable can be downloaded as a **PDF**.

## Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/auto-timetable-generator.git
   cd auto-timetable-generator
