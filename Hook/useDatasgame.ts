import { useDatas } from '~/Hook/useDatas';

export function usegetDatas (token?: any) {

    const launch_ai_game = useDatas(
        "https://126a-169-155-235-107.ngrok-free.app/launch-ia-game",
        "POST",
        {
            "userToken": token,
            "expireTokenTime": 0,
            "gameId": ""
        }
    )

    const play_with_ai = (id: string | null, user: any, tab: any) => {
        return useDatas (
            "https://126a-169-155-235-107.ngrok-free.app/update-ia-game",
            "POST",
            {
                "gameId": id,
                "first_user_token": user,
                "second_user_token": "AI",
                "tours": tab
            }
        )
    }
        
    return {
        launch_ai_game,
        play_with_ai
    }
}

