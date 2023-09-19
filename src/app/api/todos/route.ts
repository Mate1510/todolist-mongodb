import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/models/connection";
const Todo = require("@/models/todo");

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const todos = await Todo.find({});

  return NextResponse.json(todos, { status: 200 });
}

export async function POST(req: NextRequest) {
    await connectToDatabase();

    const todo = await req.json();
    await Todo.create(todo);

    return NextResponse.json({message: "Todos criadas", status: 200 });
  }
