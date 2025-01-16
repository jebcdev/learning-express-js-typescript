import { Request, Response } from "express";
import { TUser } from "../types/user.types";
import { userModel } from "../models/user.model";

type TUserController = {
    getAll : (req: Request, res: Response)=> Promise<Response>;
    getById:  (req: Request, res: Response)=> Promise<Response>;
    create : (req: Request, res: Response)=> Promise<Response> ;
    updateById :(req: Request, res: Response)=> Promise<Response>;
    deleteById :(req: Request, res: Response)=>Promise<Response>;
};

const getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users:TUser[]|null= await userModel.getAll();

        if(!users) return res.status(404).json({message: "Users not found",data:null});

        return res.status(200).json({message: "Users List",data:users});
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: "Internal server error",data:error});
    }
};

const getById= async (req: Request, res: Response): Promise<Response> => {
    try {
        const id:number = parseInt(req.params.id);
        const user:TUser|null= await userModel.getById(id);

        if(!user) return res.status(404).json({message: "User not found",data:null});

        return res.status(200).json({message: "User found",data:user});

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: "Internal server error",data:error});
    }
};

const create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: TUser = req.body;

        const newUser:TUser|null= await userModel.create(user);

        if(!newUser) return res.status(400).json({message: "User not created",data:null});

        return res.status(201).json({message: "User created",data:newUser});

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: "Internal server error",data:error});
    }
};

const updateById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id:number = parseInt(req.params.id);
        const user: TUser = req.body;

        const updatedUser= await userModel.updateById(id,user);

        if(!updatedUser) return res.status(404).json({message: "User not found",data:null});

        return res.status(200).json({message: "User updated",data:updatedUser});

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message: "Internal server error",data:error});
    }
};

const deleteById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id:number = parseInt(req.params.id);

        const deletedUser= await userModel.deleteById(id);

        if(!deletedUser) return res.status(404).json({message: "User not found",data:null});

        return res.status(200).json({message: "User deleted",data:deletedUser});

    } catch (error) {
        console.log(error);
            
        return res.status(500).json({message: "Internal server error",data:error});
    }
};

export const userController: TUserController = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
