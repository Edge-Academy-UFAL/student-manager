CREATE SEQUENCE IF NOT EXISTS password_reset_tokens_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE activities
(
    id              VARCHAR(255)  NOT NULL,
    student_id      VARCHAR(255),
    activity_type   VARCHAR(255),
    name            VARCHAR(2600) NOT NULL,
    description     VARCHAR(2600),
    work_shift      INTEGER       NOT NULL,
    start_date      date          NOT NULL,
    conclusion_date date,
    on_going        BOOLEAN       NOT NULL,
    is_paid         BOOLEAN       NOT NULL,
    CONSTRAINT pk_activities PRIMARY KEY (id)
);

CREATE TABLE administrators
(
    id VARCHAR(255) NOT NULL,
    CONSTRAINT pk_administrators PRIMARY KEY (id)
);

CREATE TABLE grades
(
    subject_code   VARCHAR(255)     NOT NULL,
    student_id     VARCHAR(255)     NOT NULL,
    period INTEGER NOT NULL,
    final_grade    DOUBLE PRECISION NOT NULL,
    subject_status VARCHAR(255)     NOT NULL,
    CONSTRAINT pk_grades PRIMARY KEY (subject_code, student_id, period)
);

CREATE TABLE invitations
(
    email         VARCHAR(255) NOT NULL,
    code          VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    student_group INTEGER      NOT NULL,
    entry_date    date         NOT NULL,
    CONSTRAINT pk_invitations PRIMARY KEY (email)
);

CREATE TABLE password_reset_tokens
(
    id          BIGINT       NOT NULL,
    token       VARCHAR(255) NOT NULL,
    user_id     VARCHAR(255) NOT NULL,
    expiry_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    used        BOOLEAN      NOT NULL,
    CONSTRAINT pk_password_reset_tokens PRIMARY KEY (id)
);

CREATE TABLE students
(
    id                  VARCHAR(255) NOT NULL,
    birth_date          date,
    course              VARCHAR(255),
    registration        VARCHAR(255),
    phone               VARCHAR(255),
    secondary_phone     VARCHAR(255),
    period INTEGER,
    entry_period        VARCHAR(255),
    student_group       INTEGER      NOT NULL,
    academic_record_url VARCHAR(255),
    entry_date          date         NOT NULL,
    termination_reason  VARCHAR(255),
    CONSTRAINT pk_students PRIMARY KEY (id)
);

CREATE TABLE subjects
(
    code     VARCHAR(255) NOT NULL,
    name     VARCHAR(255) NOT NULL,
    workload INTEGER      NOT NULL,
    CONSTRAINT pk_subjects PRIMARY KEY (code)
);

CREATE TABLE users
(
    id         VARCHAR(255)          NOT NULL,
    name       VARCHAR(255)          NOT NULL,
    email      VARCHAR(255)          NOT NULL,
    password   VARCHAR(255)          NOT NULL,
    photo_url  VARCHAR(255),
    about      VARCHAR(2600),
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    deleted    BOOLEAN DEFAULT FALSE NOT NULL,
    dtype      VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE password_reset_tokens
    ADD CONSTRAINT uc_password_reset_tokens_token UNIQUE (token);

ALTER TABLE password_reset_tokens
    ADD CONSTRAINT uc_password_reset_tokens_user UNIQUE (user_id);

ALTER TABLE users
    ADD CONSTRAINT uc_users_email UNIQUE (email);

CREATE UNIQUE INDEX idx_email ON users (email);

ALTER TABLE activities
    ADD CONSTRAINT FK_ACTIVITIES_ON_STUDENT FOREIGN KEY (student_id) REFERENCES students (id);

ALTER TABLE administrators
    ADD CONSTRAINT FK_ADMINISTRATORS_ON_ID FOREIGN KEY (id) REFERENCES users (id);

ALTER TABLE grades
    ADD CONSTRAINT FK_GRADES_ON_STUDENT FOREIGN KEY (student_id) REFERENCES students (id);

ALTER TABLE grades
    ADD CONSTRAINT FK_GRADES_ON_SUBJECT_CODE FOREIGN KEY (subject_code) REFERENCES subjects (code);

ALTER TABLE password_reset_tokens
    ADD CONSTRAINT FK_PASSWORD_RESET_TOKENS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE students
    ADD CONSTRAINT FK_STUDENTS_ON_ID FOREIGN KEY (id) REFERENCES users (id);