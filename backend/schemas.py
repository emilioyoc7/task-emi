from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskBase(BaseModel):
    text: str
    completed: bool = False

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    text: Optional[str] = None
    completed: Optional[bool] = None

class Task(TaskBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
