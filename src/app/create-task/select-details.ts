
import { Status, Priority, Resolution, Type } from '../models/task-details'
const priority = [
    { value: Priority.Minor },
    { value: Priority.Blocker },
    { value: Priority.Major },
    { value: Priority.Critical },
    { value: Priority.Trivial },

]
const status = [

    { value: Status.Todo },
    { value: Status.InProgress },
    { value: Status.Done },

]
const resolution = [
    { value: Resolution.Incomplete },
    { value: Resolution.Fixed },
    { value: Resolution.Unresolved },
    { value: Resolution.Done },
    { value: Resolution.CantReproduce },
    { value: Resolution.WontFix },
]
const type = [
    { value: Type.Bug },
    { value: Type.Story },
    { value: Type.Epic },
    { value: Type.NewFeature },
    { value: Type.Task },
]

export { type, resolution, status, priority }