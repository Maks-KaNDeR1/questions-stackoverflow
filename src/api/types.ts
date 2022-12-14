
export type ResponseType = {
    has_more: boolean
    items: QuestionType[]
    quota_max: number
    quota_remaining: number
}

export type QuestionType = {
    tags: string[],
    owner: {
        account_id: number
        reputation: number
        user_id: number
        user_type: string
        accept_rate: number
        profile_image: string
        display_name: string
        link: string
    },
    is_answered: boolean,
    view_count: number
    closed_date: number
    accepted_answer_id: number
    answer_count: number
    score: number
    last_activity_date: number
    creation_date: number
    last_edit_date: number
    question_id: number
    link: string
    closed_reason: string
    title: string
}

