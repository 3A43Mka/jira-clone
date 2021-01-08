enum Status {
    Todo = 'to do',
    InProgress = 'in progress',
    Done = 'done',
}

enum Resolution {
    Unresolved = 'Unresolved',
    Fixed = 'Fixed',
    Done = 'Done',
    WontFix = 'WontFix',
    Incomplete = 'Incomplete',
    CantReproduce = 'CantReproduce',
}

enum Priority {
    Major = 'Major',
    Minor = 'Minor',
    Critical = 'Critical',
    Trivial = 'Trivial',
    Blocker = 'Blocker',
}

enum Type {
    Epic = 'Epic',
    NewFeature = 'New feature',
    Task = 'Task',
    Bug = 'Bug',
    Story = 'Story',
}
export { Status, Priority, Resolution, Type };
