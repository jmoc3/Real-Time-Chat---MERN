type UserT = {
  id:string,
  name: string,
  email:string,
  password:string
}

type ChatT = {
  id:string,
  user_1:string,
  user_2:string,
  messages:Record<string,string>[]
}

export type { UserT, ChatT }