import moment from "moment"
import { Task } from "../../../interfaces/Tasks"

interface Props {
    tasksToday: Task[]
    date: string
}

const LightBar = ({ tasksToday, date }: Props) => {

    const quantityPerState = (state: boolean) => {
        return tasksToday.filter(({ status }) => status === state)
    }

    const total: number = tasksToday.length // total tasks of today
    const finished: number = quantityPerState(true).length
    const missing: number = quantityPerState(false).length

    // total = 7 -> es el 100% de tareas  
    // (finished / total) * 100 = A%
    // (missing / total) * 100 = B%
    // entonces A% + B% = 100% del total

    // A = 57.14 -> 22.8px
    // B = 42.86  -> 17.2px

    // entonces en % de la barra, A es el x?% de 40px -> (40px * A%)/100 = Apx
    // entonces en % de la barra, B es el x?% de 40px -> (40px * B%)/100 = Bpx
    // Apx + Bpx = 40px

    // A = 22.8px
    // B = 17.2px

    const printTotalPixel = (value: number): number => {
        const percentTask = (value / total) * 100
        const percentFinished = (40 * percentTask) / 100
        return Math.round(percentFinished)
    }

    return (
        <div className="flex flex-col items-center  w-3 ">
            <div className="flex flex-col bg-primary-200 rounded-full">
                <span className={`b bg-primary-200 w-3  rounded-full`}
                    style={{
                        height: `${printTotalPixel(missing)}px`,
                    }}
                />
                <span className={`b bg-secondary-100 w-3  rounded-full`}
                    style={{
                        height: `${printTotalPixel(finished)}px`,
                    }}
                />
            </div>
            <span className="text-text-100 mt-1">{moment(date).format('dddd').substring(0, 2)}</span>

        </div>
    )

}


export default LightBar;