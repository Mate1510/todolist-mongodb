import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/models/connection";
const Todo = require("@/models/todo");

export async function PUT(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();

  console.log(body)

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: body._id },
    { $set: body },
    { new: true }
  );

  console.log(updatedTodo)

  return NextResponse.json(updatedTodo, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();

  await Todo.deleteOne({ _id: body.id });

  return NextResponse.json("Tarefa deletada!", { status: 200 });
}
