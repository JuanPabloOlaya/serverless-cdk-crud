import { Nullable } from "../../../shared/domain/Nullable";
import { User } from "./User";
import { UserId } from "./UserId";

export interface UserRepository {
	save(user: User): Promise<void>;

	search(id: UserId): Promise<Nullable<User>>;

	remove(id: UserId): Promise<void>;
}
