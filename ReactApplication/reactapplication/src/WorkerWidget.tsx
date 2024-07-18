import { UWorker } from "./Core/Worker"

export const WorkerWidget: React.FC<{ value: string }> = ({ value }) => {
    let [worker, setWorker] = useState<UWorker>(new_worker);

    const handleEditClick=() => {
        if (worker) {
            console.log(worker); 
        }
        else
        {
            console.log("CreateWorker"); 
        }
    };


    return (
        <div style={{ height: '100vh' }}>
            <table>
                <tr>
                    <th><label for="name">Name:</label></th>
                    <th><input type="text" id="name" value="Name" /></th>
                </tr>
                <tr>  
                    <th> <label for="email">Email:</label></th>
                    <th><input type="email" id="email" value="example@example.com" /></th>
                </tr> 
                <tr>
                    <th> <label for="country">Country:</label></th>
                    <th>
                        <select id="country">
                        <option value="country1">Страна 1</option>
                        <option value="country2">Страна 2</option>
                        </select>
                    </th>
                </tr>
                <tr>
                    <th><label for="position">working position</label></th>
                    <th>
                        <select id="position">
                            <option value="position1">working position 1</option>
                            <option value="position2">working position 2</option>
                        </select>
                    </th>
                </tr>
                <tr>
                    <th><label for="podrazdelenie">working position:</label></th>
                    <th><input type="text" id="podrazdelenie" value="Podrazdelenie" />

                        <button id="btn_apply">Edit</button></th>
                </tr>
            </table>
        </div>
    );
}


