export interface JwtPayload {
  username: string;
  id: number; // Assuming sub represents user ID
  // You can include additional fields as needed, such as roles, permissions, etc.
}